import axios from 'axios';
import * as Sentry from 'sentry-expo';

export interface Line {
  line: string;
  destination: string;
  time: string;
  remainingTime: string;
}

const TIMES_URL = 'https://stcp-backend.herokuapp.com/stops';

export async function getTimes(provider: string, code: string): Promise<Line[]> {
  const response = await axios.post(TIMES_URL, {
    provider,
    code,
  });

  try {
    const times = response.data;
    return times;
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
}
