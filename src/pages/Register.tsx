import { useState } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/manualClient';

const Register = () => {
  useRevealOnScroll();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    course: '',
    qualification: '',
    experience: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.course) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('registrations').insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        institution: formData.institution || null,
        course: formData.course,
        qualification: formData.qualification || null,
        experience: formData.experience || null,
        message: formData.message || null,
      });

      if (error) throw error;

      // Send notification email
      try {
        await supabase.functions.invoke('send-notification', {
          body: {
            type: 'registration',
            data: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              course: formData.course,
              institution: formData.institution,
              message: formData.message,
            },
          },
        });
      } catch (emailError) {
        console.error('Error sending notification:', emailError);
      }

      toast({
        title: "Registration Successful!",
        description: "Thank you for registering. We will contact you soon with further details.",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        institution: '',
        course: '',
        qualification: '',
        experience: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <span className="eyebrow bg-white/10 text-white">JOIN US</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Register for <span className="text-saffron">EV Courses</span>
            </h1>
            <p className="text-xl text-white/90">
              Take the first step towards a career in electric vehicle technology
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 reveal">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-2">Registration Form</h2>
                <p className="text-muted-foreground">Fill in your details to enroll in our programs</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div>
                      <label htmlFor="institution" className="block text-sm font-medium text-foreground mb-2">
                        Current Institution/Organization
                      </label>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Your institution or company"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Course Selection</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="course" className="block text-sm font-medium text-foreground mb-2">
                        Select Course *
                      </label>
                      <select
                        id="course"
                        name="course"
                        required
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        <option value="">Choose a course</option>
                        <option value="ev-fundamentals">EV Fundamentals</option>
                        <option value="hybrid-vehicle">Hybrid Vehicle Technology</option>
                        <option value="battery-management">Battery Management Systems</option>
                        <option value="motor-control">EV Motor Control</option>
                        <option value="charging-infrastructure">Charging Infrastructure</option>
                        <option value="system-integration">EV System Integration</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="qualification" className="block text-sm font-medium text-foreground mb-2">
                        Highest Qualification
                      </label>
                      <select
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        <option value="">Select qualification</option>
                        <option value="diploma">Diploma</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Additional Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
                        Prior Experience in EV/Automotive
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        <option value="">Select experience level</option>
                        <option value="none">No experience</option>
                        <option value="beginner">Beginner (&lt; 1 year)</option>
                        <option value="intermediate">Intermediate (1-3 years)</option>
                        <option value="advanced">Advanced (3+ years)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Why do you want to join this course?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                        placeholder="Tell us about your motivation and goals..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-saffron to-accent hover:from-accent hover:to-saffron text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <UserPlus size={24} />
                        Complete Registration
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  By registering, you agree to our terms and conditions. 
                  We will contact you within 2-3 business days with further details.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
