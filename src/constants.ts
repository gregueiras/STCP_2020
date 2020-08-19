import { PROVIDERS } from "./services/location";

export const getLineColor = (provider: string, line: string): string => {
    if (provider.toUpperCase() === PROVIDERS.STCP)
        return getSTCPColor(line);
    else if (provider.toLowerCase() === PROVIDERS.METRO.toLowerCase()) 
        return getMetroColor(line)
    else
        return defaultColor
};

export const defaultColor = '#1A73CA';

function getSTCPColor(line: string) {
    try {
        const number = Number(line);

        if (number < 500) {
            return '#359ED2';
        }
        else if (number < 600) {
            return '#F8E000';
        }
        else if (number < 700) {
            return '#63A353';
        }
        else if (number < 800) {
            return '#C23122';
        }
        else if (number < 900) {
            return '#A480B0';
        }
        else {
            return '#DB9600';
        }

    } catch (error) {
        if (line === 'ZF') {
            return '#DB9600';
        } else if (line === 'ZM' || line === 'ZC') {
            return '#359ED2';
        } else {
            return '#1B1B1A';
        }
    }
}

function getMetroColor(line: string) {
    const colors = {
        A: "#009ACD",
        B: "#DD1E00",
        "Bex": "#DD1E00",
        C: "#9ACD00",
        D: "#FFBF00",
        E: "#645A96",
        F: "#FF8800",
    }

    if (colors.hasOwnProperty(line))
        // @ts-ignore
        return colors[line]
    else
        return defaultColor
}

