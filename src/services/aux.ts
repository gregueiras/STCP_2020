import { Stop } from "../redux/stops/types";

export const getName = ({ customName, provider, code }: Stop) => {
  return customName || `${provider} - ${code}`;
};
