import { FC } from "react";
import { IEuroMatch } from "../../../../pages/eurocuppage/EurocupPage";
import { EuroMatchItem } from "./EuroMatchItem";

type Props = {
    matches : IEuroMatch[]
}

export const EuroMatchesShow:FC<Props> = (props) => {
    return <div style={{display:"grid", gridTemplateColumns:'repeat(2, 1fr)', rowGap:'10px', gap:'10px'}}>
    {props.matches.map((el, index)=>{
        return (
            <EuroMatchItem key={index} match={el}/>
        )
    })}
    </div>
}