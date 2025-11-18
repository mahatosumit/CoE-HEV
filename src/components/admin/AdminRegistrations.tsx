import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/manualClient';
import { useToast } from '@/hooks/use-toast';

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (!error && data) {
      setRegistrations(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id);

    if (!error) {
      toast({ title: "Status updated successfully" });
      loadRegistrations();
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Course Registrations</h2>

      <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
        <div className="space-y-4">
          {registrations.map((reg) => (
            <div key={reg.id} className="p-4 bg-background rounded-lg border border-border">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-lg text-primary">{reg.full_name}</h4>
                  <p className="text-sm text-muted-foreground">{reg.email}</p>
                  <p className="text-sm text-muted-foreground">{reg.phone}</p>
                  {reg.institution && (
                    <p className="text-sm text-muted-foreground">🏢 {reg.institution}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm"><strong>Course:</strong> {reg.course}</p>
                  {reg.qualification && (
                    <p className="text-sm"><strong>Qualification:</strong> {reg.qualification}</p>
                  )}
                  {reg.experience && (
                    <p className="text-sm"><strong>Experience:</strong> {reg.experience}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    📅 {new Date(reg.submitted_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {reg.message && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Message:</p>
                  <p className="text-sm text-muted-foreground">{reg.message}</p>
                </div>
              )}
              <div className="mt-4 flex gap-2">
                <select
                  value={reg.status}
                  onChange={(e) => updateStatus(reg.id, e.target.value)}
                  className="px-3 py-1 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="contacted">Contacted</option>
                </select>
                <span className={`px-3 py-1 text-sm rounded-lg ${
                  reg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  reg.status === 'approved' ? 'bg-green-100 text-green-800' :
                  reg.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {reg.status}
                </span>
              </div>
            </div>
          ))}
          {registrations.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No registrations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRegistrations;
