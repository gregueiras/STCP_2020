import {
  ADD_STOP,
  EDIT_STOP,
  REMOVE_STOP,
  AddStopAction,
  EditStopAction,
  RemoveStopAction,
  Stop,
} from "./types";

import { loadLocation, PROVIDERS } from "../../services/location";
import { Dispatch } from "redux";

function formatProvider(provider: string, code?: string) {
  if (provider.toUpperCase().trim() === PROVIDERS.STCP) {
    return code?.toUpperCase().trim() ?? provider.toUpperCase().trim();
  } else {
    return code?.trim() ?? provider.trim();
  }
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
      return console.error(error);
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
  return { type: "ERASE_ALL" };
}
