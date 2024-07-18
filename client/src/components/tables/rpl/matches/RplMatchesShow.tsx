import { FC } from "react";
import { RplMatchItem } from "./RplMatchItem";
import { IRPLMatch } from "../../../../pages/rplpage/RplPage";

type Props = {
  matches?: IRPLMatch[];
};

export const RplMatchesShow: FC<Props> = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {props.matches?.map((el, index) => {
        return <RplMatchItem key={index} match={el} />;
      })}
    </div>
  );
};
