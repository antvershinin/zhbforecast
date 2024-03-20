import { FC } from "react";
import { IEuroMatch } from "../../../../pages/eurocuppage/EurocupPage";
import { EuroMatchItem } from "./EuroMatchItem";

type Props = {
  matches: IEuroMatch[];
};

export const EuroMatchesShow: FC<Props> = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {props.matches.map((el, index) => {
        return <EuroMatchItem key={index} match={el} />;
      })}
    </div>
  );
};
