import {
  ADD_STOP,
  EDIT_STOP,
  REMOVE_STOP,
  AddStopAction,
  EditStopAction,
  RemoveStopAction,
  Stop,
  StopActionTypes,
  StopsState,
} from "./types";

export const initialState: StopsState = [
  { code: "BVLH3", provider: "STCP" },
  { code: "BVLH1", provider: "STCP" },
  { code: "BVLH2", provider: "STCP" },
  { code: "BVLH4", provider: "STCP" },
];

export function stopsReducer(state = initialState, action: StopActionTypes) {
  switch (action.type) {
    case ADD_STOP: {
      const { payload: stop } = action as AddStopAction;
      return [...state, stop];
    }

    case EDIT_STOP: {
      const { payload: stop } = action as EditStopAction;

      return state.map((st) => {
        const { code, provider } = st;

        if (code === stop.code && provider === stop.provider) {
          return stop;
        } else {
          return st;
        }
      });
    }

    case REMOVE_STOP: {
      const { payload: stop } = action as RemoveStopAction;
      return state.filter(
        ({ code, provider }) => code !== stop.code || provider !== stop.provider
      );
    }

    default:
      return state;
  }
}
