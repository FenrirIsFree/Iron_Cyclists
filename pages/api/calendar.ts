import { google } from 'googleapis';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

const calendar = google.calendar('v3');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    console.log('Session:', session); // Debug: Check session data

    if (!session || !session.accessToken) {
      console.error('Unauthorized: No session or access token');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const events = await calendar.events.list({
      calendarId: 'primary',
      auth,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    console.log('Events data:', events.data); // Debug: Check response data from Google Calendar
    res.status(200).json(events.data);
  } catch (error) {
    console.error('Error fetching events:', error); // Debug: Log the error
    res.status(500).json({ error: 'Error fetching events' });
  }
}
