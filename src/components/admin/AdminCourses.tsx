import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/manualClient';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FileUpload } from './FileUpload';

const AdminCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link: '',
    published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCourses(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update(formData)
          .eq('id', editingCourse.id);

        if (error) throw error;
        toast({ title: "Course updated successfully" });
      } else {
        const { error } = await supabase.from('courses').insert(formData);
        if (error) throw error;
        toast({ title: "Course created successfully" });
      }

      resetForm();
      loadCourses();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (!error) {
      toast({ title: "Course deleted successfully" });
      loadCourses();
    }
  };

  const handleEdit = (course: any) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description || '',
      image_url: course.image_url || '',
      link: course.link || '',
      published: course.published,
    });
  };

  const resetForm = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      link: '',
      published: true,
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Manage Courses</h2>

      {/* Form */}
      <div className="bg-card rounded-xl shadow-lg p-6 mb-8 border border-border">
        <h3 className="text-xl font-bold text-primary mb-4">
          {editingCourse ? 'Edit Course' : 'Create New Course'}
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
              rows={4}
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
          <div>
            <label className="block text-sm font-medium mb-2">Link (optional)</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="published" className="text-sm">Published</label>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              {editingCourse ? 'Update Course' : 'Create Course'}
            </button>
            {editingCourse && (
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

      {/* Courses List */}
      <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
        <h3 className="text-xl font-bold text-primary mb-4">Courses List</h3>
        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-start gap-4">
                {course.image_url && (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-primary">{course.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                  {course.link && (
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                    >
                      View Details →
                    </a>
                  )}
                  <div className="mt-2">
                    <span className={`text-xs ${course.published ? 'text-green-600' : 'text-red-600'}`}>
                      {course.published ? '✓ Published' : '✗ Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No courses yet. Create your first course above.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
