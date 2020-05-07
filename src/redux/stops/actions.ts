import {
  ADD_STOP,
  EDIT_STOP,
  REMOVE_STOP,
  AddStopAction,
  EditStopAction,
  RemoveStopAction,
  Stop,
} from "./types";

export function addStop(stop: Stop): AddStopAction {
  return {
    type: ADD_STOP,
    payload: stop,
  };
}

export function editStop(customName: string): EditStopAction {
  return {
    type: EDIT_STOP,
    payload: { customName },
  };
}

export function removeStop(stop: Stop): RemoveStopAction {
  return {
    type: REMOVE_STOP,
    payload: stop,
  };
}
