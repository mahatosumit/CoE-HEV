import { useState } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/manualClient';

const Contact = () => {
  useRevealOnScroll();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (error) throw error;

      // Send notification email
      try {
        await supabase.functions.invoke('send-notification', {
          body: {
            type: 'contact',
            data: {
              name: formData.name,
              email: formData.email,
              message: formData.message,
            },
          },
        });
      } catch (emailError) {
        console.error('Error sending notification:', emailError);
      }
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
            <span className="eyebrow bg-white/10 text-white">GET IN TOUCH</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Contact <span className="text-saffron">Us</span>
            </h1>
            <p className="text-xl text-white/90">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6 reveal">
              <div className="bg-card rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-chip rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-2">Address</h3>
                    <p className="text-muted-foreground">
                      KPR Institute of Engineering and Technology,<br />
                      Arasur, Coimbatore - 641 407,<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-chip rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-2">Phone</h3>
                    <a href="tel:+914258226500" className="text-muted-foreground hover:text-primary transition-colors">
                      +91 42582 26500
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-chip rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-2">Email</h3>
                    <a href="mailto:principalkpriet@kpriet.ac.in" className="text-muted-foreground hover:text-primary transition-colors break-all">
                      principalkpriet@kpriet.ac.in
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-chip rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-2">Working Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 reveal" style={{ animationDelay: '0.2s' }}>
              <div className="bg-card rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-primary mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Your name"
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
                        className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="admission">Admission Query</option>
                        <option value="courses">Course Information</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      placeholder="Tell us what you're thinking about..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-accent hover:bg-success text-white font-bold rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section bg-chip">
        <div className="container-custom reveal">
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3009234777954!2d77.0144!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzAwLjUiTiA3N8KwMDAnNTIuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KPRIET Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
