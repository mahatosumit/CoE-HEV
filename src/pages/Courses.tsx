import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { Clock, Users, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  useRevealOnScroll();

  const courses = [
    {
      title: 'EV Fundamentals',
      duration: '4 weeks',
      level: 'Beginner',
      students: '120+',
      description: 'Introduction to electric vehicle technology, components, and basic principles.',
      topics: ['EV Architecture', 'Battery Technology', 'Electric Motors', 'Charging Systems'],
    },
    {
      title: 'Hybrid Vehicle Technology',
      duration: '6 weeks',
      level: 'Intermediate',
      students: '85+',
      description: 'Comprehensive study of hybrid powertrains and energy management systems.',
      topics: ['HEV Types', 'Power Electronics', 'Control Strategies', 'Fuel Efficiency'],
    },
    {
      title: 'Battery Management Systems',
      duration: '8 weeks',
      level: 'Advanced',
      students: '65+',
      description: 'In-depth analysis of BMS design, testing, and optimization techniques.',
      topics: ['Cell Balancing', 'SOC Estimation', 'Thermal Management', 'Safety Protocols'],
    },
    {
      title: 'EV Motor Control',
      duration: '6 weeks',
      level: 'Advanced',
      students: '70+',
      description: 'Advanced motor control techniques for electric vehicle applications.',
      topics: ['BLDC Motors', 'FOC Control', 'Inverter Design', 'Performance Tuning'],
    },
    {
      title: 'Charging Infrastructure',
      duration: '4 weeks',
      level: 'Intermediate',
      students: '90+',
      description: 'Design and implementation of EV charging stations and networks.',
      topics: ['AC/DC Charging', 'Fast Charging', 'Grid Integration', 'Standards'],
    },
    {
      title: 'EV System Integration',
      duration: '10 weeks',
      level: 'Advanced',
      students: '50+',
      description: 'Complete vehicle integration project with real-world applications.',
      topics: ['System Design', 'Testing', 'Optimization', 'Project Management'],
    },
  ];

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
