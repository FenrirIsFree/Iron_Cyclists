"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type CalendarEvent = {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  htmlLink?: string;
};

const GoogleCalendar = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/calendar');
        if (!response.ok) {
          throw new Error('Failed to fetch calendar events.');
        }
        const data = await response.json();
        setEvents(data.items || []);
      } catch (err) {
        setError('Unable to load calendar events. Please try again later.');
        console.error('Error fetching calendar events:', err);
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      fetchEvents();
    }
  }, [session]);

  return (
    <div id="rides" className="py-20">
      <h1 className="heading">
        Upcoming <span className="text-purple">Calendar Events</span>
      </h1>

      {loading ? (
        <div className="text-center text-gray-400 mt-10">Loading events...</div>
      ) : error ? (
        <div className="text-center text-red-500 mt-10">{error}</div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">No upcoming events found.</div>
      ) : (
        <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
          {events.map((event) => (
            <div
              className="lg:min-h-[20rem] h-[20rem] flex items-center justify-center sm:w-80 w-[80vw]"
              key={event.id}
            >
              <div
                className="relative flex flex-col items-start justify-between p-6 w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162D]"
              >
                <h1 className="font-bold lg:text-2xl md:text-xl text-base text-white mb-4 line-clamp-1">
                  {event.summary}
                </h1>

                <p className="lg:text-lg font-light text-sm text-gray-400 mb-4">
                  {event.start?.dateTime
                    ? new Date(event.start.dateTime).toLocaleString()
                    : event.start?.date
                    ? new Date(event.start.date).toLocaleDateString()
                    : 'No start time'}
                </p>

                <div className="flex justify-between items-center w-full mt-auto">
                  <a
                    href={event.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple lg:text-lg text-sm flex items-center"
                  >
                    View on Google Calendar
                    <FaLocationArrow className="ml-2" color="#CBACF9" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleCalendar;
