import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FileUpload } from './FileUpload';

const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    image_url: '',
    published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: false });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(formData)
          .eq('id', editingEvent.id);

        if (error) throw error;
        toast({ title: "Event updated successfully" });
      } else {
        const { error } = await supabase.from('events').insert(formData);
        if (error) throw error;
        toast({ title: "Event created successfully" });
      }

      resetForm();
      loadEvents();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) {
      toast({ title: "Event deleted successfully" });
      loadEvents();
    }
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      start_date: event.start_date.split('T')[0],
      end_date: event.end_date?.split('T')[0] || '',
      location: event.location || '',
      image_url: event.image_url || '',
      published: event.published,
    });
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      image_url: '',
      published: true,
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-primary">Manage Events</h2>
      </div>

      {/* Form */}
      <div className="bg-card rounded-xl shadow-lg p-6 mb-8 border border-border">
        <h3 className="text-xl font-bold text-primary mb-4">
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Start Date *</label>
            <input
              type="date"
              required
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Published</span>
            </label>
          </div>
          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
            {editingEvent && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/90 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Events List */}
      <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
        <h3 className="text-xl font-bold text-primary mb-4">Events List</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-primary">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span>📅 {new Date(event.start_date).toLocaleDateString()}</span>
                    {event.location && <span>📍 {event.location}</span>}
                    <span className={event.published ? 'text-green-600' : 'text-red-600'}>
                      {event.published ? '✓ Published' : '✗ Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No events yet. Create your first event above.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
