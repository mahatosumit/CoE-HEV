import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { BookOpen, Clock, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  useRevealOnScroll();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <span className="eyebrow bg-white/10 text-white">OUR PROGRAMS</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Industry-Leading <span className="text-saffron">EV Courses</span>
            </h1>
            <p className="text-xl text-white/90">
              Comprehensive training programs designed to make you an expert in 
              electric and hybrid vehicle technology
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="reveal card-hover bg-card rounded-2xl shadow-lg overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                      {course.level}
                    </div>
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground mb-6">{course.description}</p>

                  <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-primary mb-3">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-chip text-primary text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/register"
                    className="block text-center px-6 py-3 bg-accent hover:bg-success text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center reveal">
          <Award className="mx-auto mb-6 text-saffron" size={64} />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Certified in EV Technology
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Earn industry-recognized certifications and boost your career in the 
            rapidly growing electric vehicle sector
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-saffron hover:bg-green text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Courses;
