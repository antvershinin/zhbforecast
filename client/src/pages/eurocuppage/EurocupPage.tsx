import { useEffect, useState } from "react";
import { getEuroMatches } from "../../api/matchesApi";
import { EuroTable } from "../../components/tables/euro/tables/EuroTable";
import { EuroMatchesShow } from "../../components/tables/euro/matches/EuroMatchesShow";
import { ForecastList } from "../../components/tables/euro/forecasts/ForecastsList";
import { EuroForecastForm } from "../../components/forms/forms";

export interface IEuroTable {
  user_name: string;
  forecast_points: number;
  exact: number;
  difference: number;
  outcome: number;
}

export interface IEuroMatch {
  is_double: boolean;
  score1: number;
  score2: number;
  teams: [string, string];
}

export interface IEuroForecasts {
  user_name: string;
  user_score: [];
  user_forecast: [{ score1: number; score2: number }];
  forecast_points: number;
}

interface ITour {
  canMakeForecast?: boolean;
  tour: {
    forecasts: IEuroForecasts[];
    matches: IEuroMatch[];
    table: IEuroTable[];
  };
}

export const EurocupPage = () => {
  const [data, setData] = useState<ITour>();

  useEffect(() => {
    const getData = async () => {
      const response = await getEuroMatches();
      setData(response);
    };

    getData();
  }, []);

  const doubleMatch = data?.tour.matches.findIndex((el) => el.is_double);

  return (
    <>
      {" "}
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <div>
            <EuroTable data={data.tour.table} />
          </div>
          <div>
            <EuroMatchesShow matches={data.tour.matches} />
          </div>
          <div>
            <ForecastList
              double_match={doubleMatch}
              forecasts={data.tour.forecasts}
            />
          </div>
          <div>
            {!data.canMakeForecast ? null : (
              <EuroForecastForm matches={data.tour.matches} />
            )}
          </div>
        </div>
      ) : (
        <>No data</>
      )}
    </>
  );
};
