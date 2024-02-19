import { AxiosInstance } from "./axiosInstance";

export const getRPLTable = async () => {};

export const getEuroMatches = async () => {
  const result = await AxiosInstance.get("/matches/euro/getmatches");
  return result.data;
};

export const setEuroForecastsDB = async (
  matches: [{ score1: number; score2: number }]
) => {
  const result = await AxiosInstance.put("/matches/euro/setforecast", {
    matches,
  });
  return result.status;
};
