import { PROVIDERS } from "services/aux";

export const ADD_PROVIDER = 'ADD_PROVIDER';
export const REMOVE_PROVIDER = 'REMOVE_PROVIDER';

type Provider = typeof PROVIDERS[number]

export interface AddProviderAction {
  type: typeof ADD_PROVIDER;
  payload: Provider;
}

export interface RemoveProviderAction {
  type: typeof REMOVE_PROVIDER;
  payload: Provider;
}

export type ProvidersActionTypes = AddProviderAction | RemoveProviderAction;

export type ProvidersState = Provider[];

export const initialState: ProvidersState = [
    "ALBANO",
    "ARRIVA",
    "AVMINHO",
    "AVSOUTO",
    "BARQUENSE",
    "BUSPLUS",
    "CAIMA",
    "CP",
    "ETG",
    "FLOR DO GÁS",
    "JDOURO",
    "LANDIM",
    "LANDIM PACENSE",
    "MAIATRANSPORTES",
    "MGC",
    "MONDINENSE",
    "PACENSE",
    "RODONORTE",
    "TÂMEGA",
    "TRANSCOVIZELA",
    "TRANSDEV",
    "TUB",
    "TUST",
    "UTC",
    "VALPI",
]; // Hidden providers

export function addProvider(provider: Provider): AddProviderAction {
  return {
    type: ADD_PROVIDER,
    payload: provider,
  };
}

export function removeProvider(provider: Provider): RemoveProviderAction {
  return {
    type: REMOVE_PROVIDER,
    payload: provider,
  };
}


export function providersReducer(state = initialState, action: ProvidersActionTypes) {
  switch (action.type) {
    case ADD_PROVIDER: {
      const { payload: provider } = action as AddProviderAction;
      return [...state, provider];
    }

    case REMOVE_PROVIDER: {
      const { payload: providerToRemove } = action as RemoveProviderAction;
      return state.filter((provider) => provider !== providerToRemove);
    }

    default:
      return state;
  }
}