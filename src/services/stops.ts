export interface Line {
  line: string;
  destination: string;
  time: string;
  remainingTime: string;
}

const TIMES_URL = "https://stcp-backend.herokuapp.com/stops";

export async function getTimes(provider: string, code: string) {
  const response = await fetch(TIMES_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      provider,
      code,
    }),
  });

  const times = response.json();
  return times;
}
