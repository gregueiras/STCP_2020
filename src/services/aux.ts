import { Stop } from '../redux/stops/types';

export const getName = ({ customName, provider, code }: Stop) => {
  if (!customName && !provider && !code) return '';

  return customName || `${provider} ${provider.length + code.length > 18 ? "        " : "-"} ${code}`;
};

export const stopToString = ({ customName, provider, code }: Stop) => {
    return `${provider} - ${customName} - ${code}`
}