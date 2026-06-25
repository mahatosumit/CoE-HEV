import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/manualClient';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import SEO from '@/components/SEO';

const Events = () => {
  useRevealOnScroll();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('published', true)
        .order('start_date', { ascending: true});

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const hasEvent = (day: number) => {
    const dateStr = formatDate(day);
    return events.some(event => event.start_date.startsWith(dateStr));
  };

  const filteredEvents = selectedDate
    ? events.filter(event => event.start_date.startsWith(selectedDate))
    : events;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

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
            <span className="eyebrow bg-white/10 text-white">UPCOMING EVENTS</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Events & <span className="text-saffron">Activities</span>
            </h1>
            <p className="text-xl text-white/90">
              Stay updated with our latest workshops, seminars, and competitions
            </p>
          </div>
        </div>
      </section>

      {/* Calendar and Events */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2 reveal">
              <div className="bg-card rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">
                    {monthNames[month]} {year}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={prevMonth}
                      className="p-2 hover:bg-chip rounded-lg transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-chip rounded-lg transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="text-center text-sm font-bold text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const dateStr = formatDate(day);
                    const isEventDay = hasEvent(day);
                    const isSelected = selectedDate === dateStr;

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                        className={`aspect-square p-2 rounded-lg font-medium transition-all duration-300 ${
                          isSelected
                            ? 'bg-primary text-white scale-110'
                            : isEventDay
                            ? 'bg-accent text-white hover:scale-105'
                            : 'hover:bg-chip'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="mt-4 w-full px-4 py-2 bg-chip hover:bg-primary hover:text-white text-primary rounded-lg font-medium transition-all duration-300"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            {/* Events List */}
            <div className="lg:col-span-3 reveal" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="card-hover bg-card rounded-xl shadow-lg p-6 border-l-4 border-accent"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          {event.tags && event.tags.length > 0 && (
                            <span className="inline-block px-3 py-1 bg-chip text-primary text-sm font-semibold rounded-full mb-2">
                              {event.tags[0]}
                            </span>
                          )}
                          <h3 className="text-2xl font-bold text-primary">{event.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-saffron">
                          <Calendar size={20} />
                          <span className="font-semibold">
                            {new Date(event.start_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{event.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-primary" />
                          <span>
                            {new Date(event.start_date).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                            {event.end_date && ` - ${new Date(event.end_date).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}`}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-primary" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-card rounded-xl shadow-lg">
                    <Calendar size={64} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-xl text-muted-foreground">
                      No events scheduled for this date
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
