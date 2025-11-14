import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { Zap, Users, Award, TrendingUp } from 'lucide-react';

const Home = () => {
  useRevealOnScroll();
  
  const [counters, setCounters] = useState({
    students: 0,
    courses: 0,
    partners: 0,
    projects: 0,
  });

  useEffect(() => {
    const targets = { students: 500, courses: 15, partners: 25, projects: 50 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        students: Math.floor(targets.students * progress),
        courses: Math.floor(targets.courses * progress),
        partners: Math.floor(targets.partners * progress),
        projects: Math.floor(targets.projects * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-saffron rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center reveal">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              Leading Innovation in Electric Mobility
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Centre of Excellence in <span className="text-saffron">Hybrid & Electric Vehicles</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Empowering the next generation of engineers with cutting-edge knowledge 
              in sustainable transportation and electric vehicle technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="px-8 py-4 bg-saffron hover:bg-green text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Explore Courses
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 border-2 border-white/30"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center reveal">
              <div className="w-16 h-16 mx-auto mb-4 bg-chip rounded-full flex items-center justify-center">
                <Users className="text-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">{counters.students}+</div>
              <div className="text-muted-foreground">Students Trained</div>
            </div>
            <div className="text-center reveal" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-chip rounded-full flex items-center justify-center">
                <Award className="text-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">{counters.courses}+</div>
              <div className="text-muted-foreground">Specialized Courses</div>
            </div>
            <div className="text-center reveal" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-chip rounded-full flex items-center justify-center">
                <TrendingUp className="text-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">{counters.partners}+</div>
              <div className="text-muted-foreground">Industry Partners</div>
            </div>
            <div className="text-center reveal" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-chip rounded-full flex items-center justify-center">
                <Zap className="text-primary" size={32} />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">{counters.projects}+</div>
              <div className="text-muted-foreground">Live Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section bg-gradient-to-b from-background to-chip">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="eyebrow">WHO WE ARE</span>
              <h2 className="title">Pioneering the Future of Electric Mobility</h2>
              <p className="subtitle mb-6">
                Our Centre of Excellence is dedicated to advancing knowledge and skills 
                in hybrid and electric vehicle technologies, preparing students for the 
                rapidly evolving automotive industry.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'State-of-the-art laboratories and equipment',
                  'Industry-experienced faculty members',
                  'Hands-on training with real EVs',
                  'Strong industry partnerships',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-check text-white text-xs"></i>
                    </span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-primary inline-block">
                Learn More About Us
              </Link>
            </div>
            <div className="reveal">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-saffron to-green rounded-3xl opacity-20 blur-2xl"></div>
                <img
                  src="/assets/ev-lab.jpg"
                  alt="EV Laboratory"
                  className="relative rounded-2xl shadow-2xl w-full"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey in Electric Mobility?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join our programs and become part of the sustainable transportation revolution
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-saffron hover:bg-green text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Register Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
