import axios from 'axios';
import { Stop } from 'redux/stops/types';
import * as Sentry from 'sentry-expo';
import { Region } from 'react-native-maps';

const SEARCH_URL = "http://www.move-me.mobi/Find/SearchByStops"
const LOCATION_URL = "http://www.move-me.mobi/Stops/GetStops"

export async function searchStop(keyword: string): Promise<Stop[]> {
    const formData = new FormData()
    formData.append("keyword", keyword)

    const response = await axios.post(`${SEARCH_URL}`,
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

export interface LocationResponse {
    Name: string;
    Code: string;
    Type: number;
    CoordX: number;
    CoordY: number;
    Provider: string;
    Restriction: number;
    Zoning?: any;
}


export async function searchNearMe({ latitude, longitude, latitudeDelta }: Region): Promise<LocationResponse[]> {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const meters = latitudeDelta * oneDegreeOfLatitudeInMeters / 2 

    const response = await axios.get<LocationResponse[]>(LOCATION_URL, {
        params: {
            oLat: latitude,
            oLon: longitude,
            meters: meters < 200 ? 200 : meters
        }
    })

    return response.data

}