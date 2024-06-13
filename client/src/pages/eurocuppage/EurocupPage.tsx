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

export interface ITour {
  canMakeForecast?: boolean;
  tour: {
    forecasts: IEuroForecasts[];
    matches: IEuroMatch[];
    table: IEuroTable[];
    tour_number: number
  };
  playoffTable: {
    qt?: [
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[]
    ];
    sm?: [IEuroTable[], IEuroTable[], IEuroTable[], IEuroTable[]];
    fn?: [IEuroTable[], IEuroTable[]];
  };
  missed_forecasts? : [],
  groupTable?: [IEuroTable[],IEuroTable[],IEuroTable[],IEuroTable[]],
  sortedForecasts? : []
  sortedTable?: []

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

  const doubleMatch : number[] = [] 
  data?.tour.matches.map((el, index) => el.is_double && doubleMatch.push(index));

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
          {!data.tour.matches ? null : (
            <div>
              <EuroMatchesShow matches={data.tour.matches} />
            </div>
          )}
          <div>
            <ForecastList
              double_match={doubleMatch}
              forecasts={data.tour.forecasts}
            />
          </div>
          <div>
            {!data.canMakeForecast ? null : (
              <EuroForecastForm euro24={false} matches={data.tour.matches} />
            )}
          </div>
        </div>
      ) : (
        <>No data</>
      )}
    </>
  );
};
