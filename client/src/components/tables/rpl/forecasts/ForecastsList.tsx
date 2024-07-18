import { FC } from "react";
import { ForecastRow } from "./ForecastRow";
import { IRPLForecasts } from "../../../../pages/rplpage/RplPage";
import style from "./ForecastRow.module.css";


type Props = {
  forecasts?: IRPLForecasts[];
};

export const ForecastList: FC<Props> = (props) => {
  return (
      <div>
      {props.forecasts?.map((el, index) => {
        const gap = index % 2 !== 0;

        return (
          <div style={gap ? { display: "flex", marginBottom: 20 } : {}}>
            <ForecastRow key={index} el={el} />
          </div>
        );
      })}
    </div>
  );
};
