import { FC } from "react";
import { ForecastRow } from "./ForecastRow";
import { IRPLForecasts } from "../../../../pages/rplpage/RplPage";

type Props = {
    forecasts : IRPLForecasts[]
    
}

export const ForecastList :FC<Props> = (props) => {
    
    
    return <div>
        {props.forecasts.map((el, index)=>{
              
            return (

                <ForecastRow key={index} el={el}/>
            )
        })}    
    </div>
}