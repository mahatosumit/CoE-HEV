import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { Target, Eye, Award, Users } from 'lucide-react';
import SEO from '@/components/SEO';

const About = () => {
  useRevealOnScroll();

  return (
    <div>
      <SEO
        title="About the CoE in Hybrid & Electric Vehicles | KPRIET"
        description="Learn about the mission, vision, faculty and facilities of the KPRIET Centre of Excellence in Hybrid & Electric Vehicles."
        path="/about"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <span className="eyebrow bg-white/10 text-white">ABOUT US</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Leading the Charge in <span className="text-saffron">Electric Vehicle Education</span>
            </h1>
            <p className="text-xl text-white/90">
              Empowering future engineers with cutting-edge knowledge and hands-on experience 
              in hybrid and electric vehicle technologies
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="reveal card-hover bg-card p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-chip rounded-xl flex items-center justify-center mb-6">
                <Target className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-foreground leading-relaxed">
                To provide world-class education and training in hybrid and electric vehicle 
                technologies, fostering innovation and preparing students to lead the 
                sustainable transportation revolution. We aim to bridge the gap between 
                academic knowledge and industry requirements through practical, hands-on learning.
              </p>
            </div>

            <div className="reveal card-hover bg-card p-8 rounded-2xl shadow-lg" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-chip rounded-xl flex items-center justify-center mb-6">
                <Eye className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-foreground leading-relaxed">
                To become a nationally recognized Centre of Excellence in electric vehicle 
                technology, producing skilled professionals who will drive innovation in 
                sustainable mobility solutions. We envision creating a hub of research, 
                development, and collaboration that shapes the future of transportation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section bg-chip">
        <div className="container-custom">
          <div className="text-center mb-12 reveal">
            <span className="eyebrow">WHAT WE OFFER</span>
            <h2 className="title">Comprehensive Learning Experience</h2>
            <p className="subtitle mx-auto">
              State-of-the-art facilities and expert guidance for your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🔬',
                title: 'Advanced Laboratories',
                description: 'Modern labs equipped with latest EV technology and diagnostic tools for hands-on learning',
              },
              {
                icon: '👨‍🏫',
                title: 'Expert Faculty',
                description: 'Learn from industry professionals with years of experience in automotive and EV sectors',
              },
              {
                icon: '🤝',
                title: 'Industry Partnerships',
                description: 'Collaborations with leading automotive companies for internships and placements',
              },
              {
                icon: '📚',
                title: 'Comprehensive Curriculum',
                description: 'Up-to-date courses covering all aspects of hybrid and electric vehicle technology',
              },
              {
                icon: '🚗',
                title: 'Real Vehicle Training',
                description: 'Work with actual electric and hybrid vehicles to gain practical experience',
              },
              {
                icon: '🎓',
                title: 'Certification Programs',
                description: 'Industry-recognized certifications to boost your career prospects',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="reveal card-hover bg-card p-6 rounded-xl shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="eyebrow">WHY CHOOSE US</span>
              <h2 className="title">Your Gateway to the Future of Mobility</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Award className="text-saffron" />,
                    title: 'Industry-Aligned Training',
                    description: 'Our curriculum is designed in collaboration with leading automotive companies to ensure you learn the most relevant skills.',
                  },
                  {
                    icon: <Users className="text-saffron" />,
                    title: 'Small Batch Sizes',
                    description: 'Limited seats ensure personalized attention and better learning outcomes for every student.',
                  },
                  {
                    icon: <Target className="text-saffron" />,
                    title: 'Career Support',
                    description: 'Dedicated placement assistance and career guidance to help you land your dream job in the EV industry.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-chip rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-20 blur-2xl"></div>
                <img
                  src="/assets/about-lab.jpg"
                  alt="EV Training"
                  className="relative rounded-2xl shadow-2xl w-full"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
