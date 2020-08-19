import * as Sentry from 'sentry-expo';

import { StopLocation, Stop } from '../redux/stops/types';
import { TomTomAPI } from './tomtom';

export const PROVIDERS = {
  STCP: 'STCP',
  METRO: 'Metro do Porto',
};

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export async function fetchURL(searchUrl: string) {
  const response = await fetch(searchUrl); // fetch page
  const text = await response.text(); // get response text

  return text;
}

export function distance({ latitude, longitude }: StopLocation, { latitude: lat, longitude: lon }: UserLocation) {
  const toRadians = (number: number) => {
    return (number * Math.PI) / 180;
  };

  const R = 6371e3; // metres
  const φ1 = toRadians(latitude);
  const φ2 = toRadians(lat);
  const Δφ = toRadians(lat - latitude);
  const Δλ = toRadians(lon - longitude);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export async function findPlace(query: string, autocomplete: boolean, maxResults: number) {
  const apiUrl =
    `https://api.tomtom.com/search/2/poiSearch/${encodeURIComponent(query)}.JSON?key=` +
    `3NzwzZQK1ZXxP1DJE7q1ihbEOQ9GogJM` +
    `&typeahead=${autocomplete}&limit=${maxResults}&countrySet=PT` +
    `&lat=` +
    `41.14961` +
    `&lon=` +
    `-8.61099`;

  const placeResults = await fetch(apiUrl)
    .then((resp) => resp.json())
    .then((resp) => {
      try {
        const { results } = resp as TomTomAPI;

        return results.map((val) => {
          let name = val.address.freeformAddress
          if (val.poi) {
              name = val.poi.name
          }

          return {
            name,
            address: val.address.freeformAddress,
            lat: val.position.lat,
            lon: val.position.lon,
          };
        });
      } catch (error) {
        Sentry.captureException(error);
        return [];
      }
    });
  return placeResults[0];
}

export async function loadLocation({ provider, code }: Stop) {
  const coords = {
    latitude: 0,
    longitude: 0,
  };

  if (provider === PROVIDERS.STCP) {
    const url = `https://www.stcp.pt/pt/itinerarium/callservice.php?action=srchstoplines&stopcode=${code}`;
    const res = JSON.parse(await fetchURL(url))[0].geomdesc;
    const { coordinates } = JSON.parse(res);

    [coords.longitude, coords.latitude] = coordinates;
  } else {
    try {
      const { lat, lon } = await findPlace(`${provider} ${code}`, true, 1);

      coords.latitude = lat;
      coords.longitude = lon;
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  return coords;
}

export async function validateStop(provider: string, stopToAdd: string, stops: Stop[]) {
  if (stops.filter(({ code, provider: p }) => code === stopToAdd && p === provider).length !== 0) {
    throw new Error('Repeated Stop');
  }
  const location = await loadLocation({ provider, code: stopToAdd });

  return {
    provider,
    stop: stopToAdd,
    coords: location,
  };
}
