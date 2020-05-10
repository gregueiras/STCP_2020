import axios from 'axios';
import * as Sentry from 'sentry-expo';

export interface Line {
  line: string;
  destination: string;
  time: string;
  remainingTime: string;
}

export interface SubscriptionRequest {
  provider: string;
  code: string;
  line: string;
  token: string;
}

export interface UnsubscriptionRequest {
  provider: string;
  code: string;
  token: string;
}

const BASE_URL = 'https://stcp-backend.herokuapp.com';
export async function getTimes(provider: string, code: string): Promise<Line[]> {
  const response = await axios.post(`${BASE_URL}/stops`, {
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

export async function subscribe({ token, code, provider, line }: SubscriptionRequest) {
  await axios.post(`${BASE_URL}/subscribe`, {
    provider,
    code,
    token,
    line,
  });
}

export async function unsubscribe({ token, code, provider }: UnsubscriptionRequest) {
  await axios.post(`${BASE_URL}/unsubscribe`, {
    provider,
    code,
    token,
  });
}
