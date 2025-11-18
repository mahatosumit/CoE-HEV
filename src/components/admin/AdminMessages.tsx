import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/manualClient';
import { Mail, MailOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ read: !currentStatus })
      .eq('id', id);

    if (!error) {
      toast({ title: `Message marked as ${!currentStatus ? 'read' : 'unread'}` });
      loadMessages();
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Contact Messages</h2>

      <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-lg border transition-all ${
                msg.read ? 'bg-background border-border' : 'bg-accent/5 border-accent/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {msg.read ? (
                      <MailOpen size={20} className="text-muted-foreground" />
                    ) : (
                      <Mail size={20} className="text-accent" />
                    )}
                    <h4 className="font-bold text-primary">{msg.name}</h4>
                    {!msg.read && (
                      <span className="px-2 py-0.5 text-xs bg-accent text-white rounded-full">New</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">📧 {msg.email}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    📅 {new Date(msg.created_at).toLocaleString()}
                  </p>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleRead(msg.id, msg.read)}
                  className="ml-4 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {msg.read ? 'Mark Unread' : 'Mark Read'}
                </button>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No messages yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
