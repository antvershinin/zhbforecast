import { AxiosInstance } from "./axiosInstance";

interface ITeam {
  id: string;
  name: string;
}

export const getTeams = async () => {
  const response = await AxiosInstance.get<ITeam>("/admin/getteams");
  return response.data;
};

export const setEuroMatches = async (matches: any) => {
  const response = await AxiosInstance.post('/admin/euro/setmatches', {
    matches
  })
  return response.data
}