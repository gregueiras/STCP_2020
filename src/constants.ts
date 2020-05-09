export const getLineColor = (line: string): string => {
  let color;

  try {
    const number = Number(line);

    if (number < 500) {
      color = '#359ED2';
    } else if (number < 600) {
      color = '#F8E000';
    } else if (number < 700) {
      color = '#63A353';
    } else if (number < 800) {
      color = '#C23122';
    } else if (number < 900) {
      color = '#A480B0';
    } else {
      color = '#DB9600';
    }
  } catch (error) {
    if (line === 'ZF') {
      color = '#DB9600';
    } else if (line === 'ZM' || line === 'ZC') {
      color = '#359ED2';
    } else {
      color = '#1B1B1A';
    }
  }

  return color;
};

export const defaultColor = '#1A73CA';
