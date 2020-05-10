import {
  ADD_STOP,
  EDIT_STOP,
  REMOVE_STOP,
  AddStopAction,
  EditStopAction,
  RemoveStopAction,
  StopActionTypes,
  StopsState,
} from './types';

export const initialState: StopsState = [];

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
          return { ...st, ...stop };
        }
        return st;
      });
    }

    case REMOVE_STOP: {
      const { payload: stop } = action as RemoveStopAction;
      return state.filter(({ code, provider }) => code !== stop.code || provider !== stop.provider);
    }

    default:
      return state;
  }
}
