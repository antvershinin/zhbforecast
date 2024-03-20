import { FC } from "react";
import { ForecastRow } from "./ForecastRow";
import { IRPLForecasts } from "../../../../pages/rplpage/RplPage";

type Props = {
  forecasts: IRPLForecasts[];
};

export const ForecastList: FC<Props> = (props) => {
  return (
    <div>
      {props.forecasts.map((el, index) => {
        const gap = index % 2 !== 0;
        console.log(gap);

        return (
          <div style={gap ? { display: "flex", marginBottom: 20 } : {}}>
            <ForecastRow key={index} el={el} />
          </div>
        );
      })}
    </div>
  );
};
