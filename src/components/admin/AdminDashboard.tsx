import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/manualClient';
import { Calendar, Image, BookOpen, Users, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    events: 0,
    gallery: 0,
    courses: 0,
    registrations: 0,
    messages: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [events, gallery, courses, registrations, messages] = await Promise.all([
      supabase.from('events').select('id', { count: 'exact', head: true }),
      supabase.from('gallery_items').select('id', { count: 'exact', head: true }),
      supabase.from('courses').select('id', { count: 'exact', head: true }),
      supabase.from('registrations').select('id', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      events: events.count || 0,
      gallery: gallery.count || 0,
      courses: courses.count || 0,
      registrations: registrations.count || 0,
      messages: messages.count || 0,
    });
  };

  const statCards = [
    { title: 'Events', value: stats.events, icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { title: 'Gallery Items', value: stats.gallery, icon: Image, color: 'from-purple-500 to-purple-600' },
    { title: 'Courses', value: stats.courses, icon: BookOpen, color: 'from-green-500 to-green-600' },
    { title: 'Registrations', value: stats.registrations, icon: Users, color: 'from-orange-500 to-orange-600' },
    { title: 'Messages', value: stats.messages, icon: MessageSquare, color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-card rounded-xl shadow-lg p-6 border border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-card rounded-xl shadow-lg p-6 border border-border">
        <h3 className="text-xl font-bold text-primary mb-4">Quick Actions</h3>
        <p className="text-muted-foreground">
          Use the sidebar navigation to manage events, gallery items, courses, registrations, and messages.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
