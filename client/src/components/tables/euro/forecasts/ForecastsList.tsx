import { FC } from "react";
import { IEuroForecasts } from "../../../../pages/eurocuppage/EurocupPage";
import { ForecastRow } from "./ForecastRow";

type Props = {
    forecasts : IEuroForecasts[]
    double_match? : number[]
}

export const ForecastList :FC<Props> = (props) => {
    
    
    return <div>
        {props.forecasts.map((el, index)=>{
              
            return (

                <ForecastRow key={index} double_match={props.double_match} el={el}/>
            )
        })}    
    </div>
}