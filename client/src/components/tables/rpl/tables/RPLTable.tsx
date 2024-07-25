import { FC } from "react"
import {IRPLForecasts, IRPLTable} from '../../../../pages/rplpage/RplPage'
import { RPLTableRow } from "./RPLTableRow"
import style from './RPLTableRow.module.css'


type Props = {
    data? : IRPLTable[]
    missed_forecasts? : IRPLForecasts[]
}

export const RPLTable : FC<Props> = (props) => {
    return <>
    <div className={style.row} style={{flexDirection:'row-reverse'}}>      
        <div className={style.points} style={{transform:'rotate(-55deg)', paddingBottom:10}}>туры</div>
        <div className={style.points} style={{transform:'rotate(-55deg)', paddingBottom:10}}>баллы</div>
        <div className={style.points} style={{transform:'rotate(-55deg)', paddingBottom:10}}>п</div>
        <div className={style.points} style={{transform:'rotate(-55deg)', paddingBottom:10}}>н</div>
        <div className={style.points} style={{transform:'rotate(-55deg)', paddingBottom:10}}>в</div>
        <div className={style.points} style={{transform:'rotate(-55deg)', paddingBottom:10}}>очки</div>
        
        </div> 
        {props.data?.map((el, index)=>{
           return (
            <RPLTableRow props={el} missed_forecasts={props.missed_forecasts} standings={index + 1} key={index + 1} />
            )
        })}
    </>
}