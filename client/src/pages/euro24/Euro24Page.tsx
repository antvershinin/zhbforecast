import React, { useEffect, useState } from "react";
import { getEuro24Matches } from "../../api/matchesApi";
import { EuroForecastForm } from "../../components/forms/forms";
import { ITour } from "../eurocuppage/EurocupPage";
import { PlayoffTree } from "../../components/euro24/playofftree/PlayoffTree";
import { EuroMatchesShow } from "../../components/tables/euro/matches/EuroMatchesShow";
import { ForecastList } from "../../components/tables/euro/forecasts/ForecastsList";
import { EuroTable } from "../../components/tables/euro/tables/EuroTable";

const Euro24Page = () => {
  const [data, setData] = useState<ITour>();

  useEffect(() => {
    const getData = async () => {
      const response = await getEuro24Matches();
      setData(response);
    };

    getData();
  }, []);

  console.log(data)

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
            gap: "30px",
            paddingBottom:'20px'
          }}
        >
          <div>
            {data.canMakeForecast && (
              <EuroForecastForm euro24 matches={data.tour.matches} />
            )}
          </div>
          <div style={data.tour.tour_number > 3 ? {display:'flex', flexDirection:'column', gap:30} : {display:'flex', flexDirection:'column-reverse', gap:30}}>
            <div>
              <PlayoffTree arr={data.playoffTable} />
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:30}}>
              <div>
                {data.tour.matches && <EuroMatchesShow matches={data.tour.matches}/>}
              </div>
              <div>
                {data.sortedForecasts && data.sortedForecasts.map((el)=>(
                  <div style={{marginBottom:30}}>
                  <ForecastList forecasts={el} double_match={doubleMatch}/>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {data.tour.tour_number > 3 && data.groupTable && data.groupTable.map(el=>(
                <div style={{marginBottom:30}}>
                <EuroTable data={el}/>
                </div>
              ))}
              {data.tour.tour_number < 4 && data.sortedTable && data.sortedTable.map(el=>(
                <div style={{marginBottom:30}}>
                <EuroTable data={el}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>No data</>
      )}
    </>
  );
};

export default Euro24Page;
