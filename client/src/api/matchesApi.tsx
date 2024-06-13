import { AxiosInstance } from "./axiosInstance";

export const getEuroMatches = async () => {
  const result = await AxiosInstance.get("/matches/euro/getmatches");
  return result.data;
};

export const getEuro24Matches = async () => {
  const result = await AxiosInstance.get("/matches/euro24/getmatches");
  return result.data;
};

export const getRplMatches = async () => {
  const result = await AxiosInstance.get("/matches/rpl/getmatches")
  return result.data
}

export const setEuroForecastsDB = async (
  matches: [{ score1: number; score2: number }]
) => {
  const result = await AxiosInstance.put("/matches/euro/setforecast", {
    matches,
  });
  return result.status;
};

export const setRplForecastsDB = async (
  matches: [{score1 : number; score2:number}]
) => {
  const result = await AxiosInstance.put('/matches/rpl/setforecast', {
    matches
  })
  return result.status
}

export const setEuro24ForecastsDB = async (
  matches: [{ score1: number; score2: number }]
) => {
  const result = await AxiosInstance.put("/matches/euro24/setforecast", {
    matches,
  });
  return result.status;
};