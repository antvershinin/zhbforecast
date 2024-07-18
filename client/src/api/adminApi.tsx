import { ISetRPLMatch } from "../pages/admin/AdminPage";
import { AxiosInstance } from "./axiosInstance";

export interface ITeam {
  id: string;
  name: string;
}

export const getTeams = async () => {
  const response = await AxiosInstance.get<ITeam[]>("/admin/getteams");
  return response.data;
};


export const setRPLMatches = async (matches : any) => {
  const response = await AxiosInstance.post('/admin/rpl/setmatches', {
    matches
  })
  return response.data
}

export const editScoreRPL = async (match:any) => {
  const response = await AxiosInstance.put('/admin/rpl/editscore', {
    match
  })
}

export const setRPLTourWinner = async (id:string) => {
  const response = await AxiosInstance.put('/admin/rpl/settourwinner', {
    id
  })
  return response.data
}

export const setEuroMatches = async (matches: any) => {
  const response = await AxiosInstance.post('/admin/euro/setmatches', {
    matches
  })
  return response.data
}