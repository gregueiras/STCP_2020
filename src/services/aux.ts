import { Stop } from '../redux/stops/types';

export const getName = ({ customName, provider, code }: Stop) => {
  if (!customName && !provider && !code) return '';

  return customName || `${provider} - ${code}`;
};

export const stopToString = ({ customName, provider, code }: Stop) => {
    return `${provider} - ${customName} - ${code}`
}