import { AxiosInstance } from "./axiosInstance";

export const getRPLTable = async () => {};

export const getEuroMatches = async () => {
  const result = await AxiosInstance.get("/matches/euro/getmatches");
  return result.data;
};
