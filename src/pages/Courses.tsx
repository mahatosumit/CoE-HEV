import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/manualClient';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { BookOpen, Clock, Users, Award, Shield, Wrench, Battery } from 'lucide-react';
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

      {/* IMI Certification Courses */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12 reveal">
            <span className="eyebrow">INTERNATIONAL CERTIFICATIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              IMI Certification Programs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Globally recognized qualifications from the Institute of the Motor Industry (IMI)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* IMI Level 1 */}
            <div className="reveal card-hover bg-card rounded-2xl shadow-lg overflow-hidden" style={{ animationDelay: '0s' }}>
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                    Level 1
                  </div>
                  <Battery className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">EV/Hybrid Awareness</h3>
                <p className="text-xs text-white/80">Ref: INT-EHV1-A-23</p>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6">
                  Entry qualification giving broad awareness of EV/Hybrid systems, hazards and safe conduct for technical and non-technical staff.
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-primary mb-3">Learning Outcomes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Identify vehicle types: BEV, HEV, PHEV, FCEV</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Recognize hazards of high-energy battery systems</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Apply safe isolation, signage, PPE and charging etiquette</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/register"
                  className="block text-center px-6 py-3 bg-accent hover:bg-success text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  Enroll Now
                </Link>
              </div>
            </div>

            {/* IMI Level 2.1 */}
            <div className="reveal card-hover bg-card rounded-2xl shadow-lg overflow-hidden" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-blue-700 to-blue-600 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                    Level 2.1
                  </div>
                  <Shield className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Hazard Management</h3>
                <p className="text-xs text-white/80">Ref: INT-EHVHM2-A</p>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6">
                  Equips first responders and roadside operators with critical hazard-spotting and mitigation skills around electrified vehicles.
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-primary mb-3">Learning Outcomes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Scene assessment, cordon setup, HV labelling</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Fire/submersion considerations & runaway indicators</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Towing, lifting and disable procedures</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/register"
                  className="block text-center px-6 py-3 bg-accent hover:bg-success text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  Enroll Now
                </Link>
              </div>
            </div>

            {/* IMI Level 2.2 */}
            <div className="reveal card-hover bg-card rounded-2xl shadow-lg overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-blue-800 to-blue-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                    Level 2.2
                  </div>
                  <Wrench className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">EV Maintenance</h3>
                <p className="text-xs text-white/80">Ref: INT-EHVRM2-A-23</p>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6">
                  For technicians with L2 vehicle maintenance knowledge who will prepare and work around electrified vehicles without opening HV battery packs.
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-primary mb-3">Learning Outcomes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>System architecture: inverter, DC/DC, charger, BMS</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Risk assessment, lock-out/tag-out, safe reset</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Service ops: coolant service, regen brake service</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/register"
                  className="block text-center px-6 py-3 bg-accent hover:bg-success text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Courses from Database */}
          {courses.length > 0 && (
            <>
              <div className="text-center mb-12 reveal">
                <span className="eyebrow">ADDITIONAL PROGRAMS</span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Specialized Training Courses
                </h2>
              </div>
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
                          {course.topics?.map((topic, i) => (
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
            </>
          )}
        </div>
      </section>

      {/* Skill Training Section */}
      <section className="section bg-muted/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="eyebrow">SKILL TRAINING PROGRAM</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Hands-on Skill Tracks
              </h2>
              <p className="text-muted-foreground mb-8">
                Industry-relevant tracks designed to transform theory into employable practice within weeks.
              </p>
              <div className="grid gap-4">
                <div className="p-4 bg-card rounded-lg border-2 border-transparent hover:border-accent transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-bold text-primary mb-2">Vehicle Body Prep & Painting</h4>
                  <p className="text-sm text-muted-foreground">Base coat, primer, colour matching and HVLP gun usage.</p>
                </div>
                <div className="p-4 bg-card rounded-lg border-2 border-transparent hover:border-accent transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-bold text-primary mb-2">Reverse Engineering & CAD</h4>
                  <p className="text-sm text-muted-foreground">Teardown analysis, GD&T, parametric modelling and assemblies.</p>
                </div>
                <div className="p-4 bg-card rounded-lg border-2 border-transparent hover:border-accent transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-bold text-primary mb-2">Diagnostic Scanners</h4>
                  <p className="text-sm text-muted-foreground">OBD-II, CAN bus tracing, fault code triage and freeze-frame analysis.</p>
                </div>
              </div>
            </div>
            <div className="reveal">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="text-primary" size={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal md:order-2">
              <span className="eyebrow">WORKSHOPS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Specialized Automotive Workshops
              </h2>
              <p className="text-muted-foreground mb-8">
                Immersive workshops that let students and professionals practice with real automotive systems.
              </p>
              <div className="grid gap-4">
                <div className="p-4 bg-card rounded-lg border-2 border-transparent hover:border-accent transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-bold text-primary mb-2">IC Engine Overhaul</h4>
                  <p className="text-sm text-muted-foreground">Complete strip-down and rebuild of 4-stroke IC engines.</p>
                </div>
                <div className="p-4 bg-card rounded-lg border-2 border-transparent hover:border-accent transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-bold text-primary mb-2">Vehicle Dynamics Lab</h4>
                  <p className="text-sm text-muted-foreground">Testing suspension geometry, weight transfer and chassis setup.</p>
                </div>
                <div className="p-4 bg-card rounded-lg border-2 border-transparent hover:border-accent transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-bold text-primary mb-2">EV Conversion Workshop</h4>
                  <p className="text-sm text-muted-foreground">Retrofit of small vehicles to EV drivetrains with safety compliance.</p>
                </div>
              </div>
            </div>
            <div className="reveal md:order-1">
              <div className="aspect-video bg-gradient-to-br from-accent/10 to-success/10 rounded-2xl flex items-center justify-center">
                <Wrench className="text-accent" size={80} />
              </div>
            </div>
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
