import { useEffect, useState } from "react";
import { getRplMatches } from "../../api/matchesApi";
import { RPLTable } from "../../components/tables/rpl/tables/RPLTable";
import { RplMatchesShow } from "../../components/tables/rpl/matches/RplMatchesShow";
import { ForecastList } from "../../components/tables/rpl/forecasts/ForecastsList";
import { RPLForecastForm } from "../../components/forms/prlforms";

export interface IRPLTable {
  user_name: string;
  user_id: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  forecast_points: number;
  tours: number;
  matches : [{user1:string, score1 : string, user2: string, score2 : number}]

}

export interface IRPLMatch {
  score1: number;
  score2: number;
  teams_names: [string, string];
  _id: string;
}

export interface IRPLForecasts {
  user_id: string;
  user_name: string;
  user_score: [];
  user_forecast: [{ score1: number; score2: number }];
  forecast_points: number;
  user_doubleMatch: number;
}

export interface IUserMatches {
  user_id: string;
  user1: string;
  score1: number;
  user2: string;
  score2: number;
}

interface IRPLTour {
  tour: {
    canMakeForecast?: boolean;
    forecasts?: IRPLForecasts[];
    matches?: IRPLMatch[];
    table?: IRPLTable[];
    missed_forecasts?: IRPLForecasts[];
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
      }}
    >
      <div>
        {!data?.tour.table ? null : (
          <RPLTable
            missed_forecasts={data.tour.missed_forecasts}
            data={data.tour.table}
          />
        )}
      </div>
      <div>
        {!data?.tour.matches ? null : (
          <RplMatchesShow matches={data.tour.matches} />
        )}
      </div>
      <div>
        {!data?.tour.forecasts ? null : (
          <ForecastList forecasts={data.tour.forecasts} />
        )}
      </div>
      <div>
        {!data?.tour.canMakeForecast ? null : (
          <RPLForecastForm matches={data.tour.matches!} />
        )}
      </div>
    </div>
  );
};
