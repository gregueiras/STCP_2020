import { Stop } from '../redux/stops/types';

export const getName = ({ customName, provider, code }: Stop,  padding = true) => {
  if (!customName && !provider && !code) return '';

  return customName?.trim() || `${provider.trim()} ${(provider.length + code.length > 18 && padding) ? "        " : "-"} ${code.trim()}`;
};

export const stopToString = ({ customName, provider, code }: Stop) => {
    return `${provider} - ${customName} - ${code}`
}