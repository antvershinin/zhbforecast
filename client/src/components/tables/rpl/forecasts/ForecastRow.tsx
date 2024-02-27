import { FC } from "react";
import style from './ForecastRow.module.css'

type Props = {
    el : {
        user_name : string
        user_score : []
        user_forecast : [{score1: number, score2: number}]
        forecast_points: number
    },
}

export const ForecastRow :FC<Props> = (props) => {

    return <div className={style.row}>
        <div className={style.name}>{props.el.user_name}</div>
        <div>
            <div className={style.forecast_wrapper}>{props.el.user_forecast.map((el1, index)=>{
            return ( 
                <div key={index} className={style.forecasts}><span>{el1.score1}</span><span>-</span><span>{el1.score2}</span></div>
            )
            })}</div>
        <div className={style.forecast_wrapper}>{props.el.user_score.map((el, index)=>{
            return (
                <div key={index} className={style.forecasts}>{el}</div>
            )
        })}</div>
        </div>
        <div className={style.total}>{props.el.forecast_points}</div>
        
        
        

    </div>
}