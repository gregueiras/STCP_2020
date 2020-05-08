export const ADD_STOP = "ADD_STOP";
export const EDIT_STOP = "EDIT_STOP";
export const REMOVE_STOP = "REMOVE_STOP";

export interface StopLocation {
  latitude: number;
  longitude: number;
}

export interface Stop {
  code: string;
  provider: string;
  customName?: string;
  location?: StopLocation;
}

export interface AddStopAction {
  type: typeof ADD_STOP;
  payload: Stop;
}

export interface EditStopAction {
  type: typeof EDIT_STOP;
  payload: Stop;
}

export interface RemoveStopAction {
  type: typeof REMOVE_STOP;
  payload: Stop;
}

export type StopActionTypes = AddStopAction | EditStopAction | RemoveStopAction;

export type StopsState = Stop[];
