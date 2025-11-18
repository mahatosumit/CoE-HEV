import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/manualClient';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, Calendar, Image, BookOpen, Users, MessageSquare } from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminGallery from '@/components/admin/AdminGallery';
import AdminCourses from '@/components/admin/AdminCourses';
import AdminRegistrations from '@/components/admin/AdminRegistrations';
import AdminMessages from '@/components/admin/AdminMessages';

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasRole, setHasRole] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        checkUserRole(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        checkUserRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .in('role', ['admin', 'editor'])
      .single();

    if (data && !error) {
      setHasRole(true);
    } else {
      setHasRole(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!hasRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have permission to access the admin panel.</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border">
        <div className="container-custom py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-73px)] bg-card border-r border-border p-6">
          <nav className="space-y-2">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/events"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
            >
              <Calendar size={20} />
              <span>Events</span>
            </Link>
            <Link
              to="/admin/gallery"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
            >
              <Image size={20} />
              <span>Gallery</span>
            </Link>
            <Link
              to="/admin/courses"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
            >
              <BookOpen size={20} />
              <span>Courses</span>
            </Link>
            <Link
              to="/admin/registrations"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
            >
              <Users size={20} />
              <span>Registrations</span>
            </Link>
            <Link
              to="/admin/messages"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
            >
              <MessageSquare size={20} />
              <span>Messages</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="registrations" element={<AdminRegistrations />} />
            <Route path="messages" element={<AdminMessages />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Admin;
