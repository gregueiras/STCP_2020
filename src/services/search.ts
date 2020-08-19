import axios from 'axios';
import { Stop } from 'redux/stops/types';
import * as Sentry from 'sentry-expo';

const BASE_URL = "http://www.move-me.mobi/Find/SearchByStops"

export async function searchStop(keyword: string): Promise<Stop[]> {
  const formData = new FormData()
  formData.append("keyword", keyword)

  const response = await axios.post(`${BASE_URL}`,
    formData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

  try {
    const stopsTemp = response.data;

    const stops: Stop[] = stopsTemp.split(";")
      .filter((s: string) => s !== "")
      .map((s: string) => {
        const provider = s.split(" - ")[0] // STCP
        const fullCode = /\[(.*)\]/.exec(s)

        if (fullCode !== null) {
          const code = fullCode[1].split("_")[1] // BCM1
          const customName = s.split(" - ")[1].split(" [")[0] // Boavista-casa da Música

          return { provider, code, customName }
        } else {
          return null
        }
      })
      .filter((s: Stop | null) => s !== null)

    return stops;
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
}