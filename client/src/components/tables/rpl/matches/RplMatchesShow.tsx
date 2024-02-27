import { FC } from "react";
import { RplMatchItem } from "./RplMatchItem";
import { IRPLMatch } from "../../../../pages/rplpage/RplPage";

type Props = {
    matches : IRPLMatch[]
}

export const RplMatchesShow:FC<Props> = (props) => {
    return <div style={{display:"grid", gridTemplateColumns:'repeat(2, 1fr)', rowGap:'10px', gap:'10px'}}>
    {props.matches.map((el, index)=>{
        return (
            <RplMatchItem key={index} match={el}/>
        )
    })}
    </div>
}