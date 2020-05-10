import Toast from 'react-native-root-toast';
import { Dispatch } from 'redux';
import * as Sentry from 'sentry-expo';

import { loadLocation, PROVIDERS } from '../../services/location';
import { ADD_STOP, EDIT_STOP, REMOVE_STOP, AddStopAction, EditStopAction, RemoveStopAction, Stop } from './types';

function formatProvider(provider: string, code?: string) {
  if (provider.toUpperCase().trim() === PROVIDERS.STCP) {
    return code?.toUpperCase().trim() ?? provider.toUpperCase().trim();
  }
  return code?.trim() ?? provider.trim();
}

export function addStop(stop: Stop): (dispatch: Dispatch) => void {
  return async function (dispatch: Dispatch): Promise<void> {
    const formattedStop: Stop = {
      ...stop,
      provider: formatProvider(stop.provider),
      code: formatProvider(stop.provider, stop.code),
    };

    try {
      const location = await loadLocation(formattedStop);
      dispatch(addStopAux({ ...formattedStop, location }));
    } catch (error) {
      Toast.show(`Paragem inválida`);
      Sentry.captureException(error);
    }
  };
}

export function addStopAux(stop: Stop): AddStopAction {
  return {
    type: ADD_STOP,
    payload: stop,
  };
}

export function editStop(stop: Stop): EditStopAction {
  return {
    type: EDIT_STOP,
    payload: stop,
  };
}

export function removeStop(stop: Stop): RemoveStopAction {
  return {
    type: REMOVE_STOP,
    payload: stop,
  };
}

export function eraseAll() {
  return { type: 'ERASE_ALL' };
}
