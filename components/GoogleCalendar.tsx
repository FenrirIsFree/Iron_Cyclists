import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type CalendarEvent = {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
};

const GoogleCalendar = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/calendar');
        const data = await response.json();
        console.log('Fetched Events:', data); // Debug log for fetched data
        setEvents(data.items || []);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      }
    };
    if (session) {
      fetchEvents();
    }
  }, [session]);

  return (
    <div>
      <h1>My Calendar Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.summary} -{' '}
            {event.start?.dateTime
              ? new Date(event.start.dateTime).toLocaleString()
              : event.start?.date
              ? new Date(event.start.date).toLocaleDateString()
              : 'No start time'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleCalendar;
