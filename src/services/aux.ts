import { Stop } from '../redux/stops/types';

export const getName = ({ customName, provider, code }: Stop, padding = true) => {
    if (!customName && !provider && !code) return '';

    return customName?.trim() || `${provider.trim()} ${(provider.length + code.length > 18 && padding) ? "        " : "-"} ${code.trim()}`;
};

export const stopToString = ({ customName, provider, code }: Stop) => {
    return `${provider} - ${customName} - ${code}`
}

export const PROVIDERS = [
    "ALBANO",
    "ARRIVA",
    "AVMINHO",
    "AVSOUTO",
    "BARQUENSE",
    "BUSPLUS",
    "CAIMA",
    "CP",
    "ESPÍRITO SANTO",
    "ETG",
    "FLOR DO GÁS",
    "JDOURO",
    "LANDIM",
    "LANDIM PACENSE",
    "MAIATRANSPORTES",
    "MARÉ",
    "METRO DO PORTO",
    "MGC",
    "MONDINENSE",
    "PACENSE",
    "RODONORTE",
    "STCP",
    "TÂMEGA",
    "TRANSCOVIZELA",
    "TRANSDEV",
    "TUB",
    "TUST",
    "UTC",
    "VALPI",
] as const