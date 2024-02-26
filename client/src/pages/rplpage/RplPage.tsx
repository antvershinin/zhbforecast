import { useEffect, useState } from "react";
import { getRplMatches } from "../../api/matchesApi";
import { RPLTable } from "../../components/tables/rpl/tables/RPLTable";

export interface IRPLTable {
  user_name: string;
  points:number;
  wins: number;
  draws: number;
  losses: number;
  forecast_points: number;
}

export interface IRPLMatch {
  score1: number;
  score2: number;
  teams_names: [string, string];
}

export interface IRPLForecasts {
  user_name: string;
  user_score: [];
  user_forecast: [{ score1: number; score2: number }];
  forecast_points: number;
  user_doubleMatch:number
}

interface IRPLTour {
  canMakeForecast?: boolean;
  tour: {
    forecasts?: IRPLForecasts[];
    matches?: IRPLMatch[];
    table?: IRPLTable[];
  };
}

export const RplPage = () => {

  const [data, setData] = useState<IRPLTour>();

  useEffect(() => {
    const getData = async () => {
      const response = await getRplMatches();
      setData(response);
    };

    getData();
  }, []);



  return (
    <div>
    {!data?.tour.table ? null : (
      <RPLTable data={data.tour.table}/>
    )}
    </div>
  );
};
