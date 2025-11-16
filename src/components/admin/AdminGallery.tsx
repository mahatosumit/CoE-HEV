import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FileUpload } from './FileUpload';

const AdminGallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    thumbnail_url: '',
    tags: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      const payload = {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        thumbnail_url: formData.thumbnail_url || formData.image_url,
        tags: tagsArray,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('gallery_items')
          .update(payload)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast({ title: "Gallery item updated successfully" });
      } else {
        const { error } = await supabase.from('gallery_items').insert(payload);
        if (error) throw error;
        toast({ title: "Gallery item created successfully" });
      }

      resetForm();
      loadItems();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (!error) {
      toast({ title: "Gallery item deleted successfully" });
      loadItems();
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      image_url: item.image_url,
      thumbnail_url: item.thumbnail_url || '',
      tags: item.tags?.join(', ') || '',
    });
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      thumbnail_url: '',
      tags: '',
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Manage Gallery</h2>

      {/* Form */}
      <div className="bg-card rounded-xl shadow-lg p-6 mb-8 border border-border">
        <h3 className="text-xl font-bold text-primary mb-4">
          {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL *</label>
            <input
              type="url"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail URL (optional)</label>
            <input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Leave empty to use main image"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="workshop, training, lab"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
            {editingItem && (
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

      {/* Gallery Grid */}
      <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
        <h3 className="text-xl font-bold text-primary mb-4">Gallery Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative group">
              <img
                src={item.thumbnail_url || item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-white text-blue-600 rounded hover:bg-blue-50 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white text-red-600 rounded hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mt-2">
                <h4 className="font-bold text-sm">{item.title}</h4>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {item.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No gallery items yet. Add your first item above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
