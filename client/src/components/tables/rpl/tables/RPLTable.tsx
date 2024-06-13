import { FC } from "react"
import {IRPLForecasts, IRPLTable} from '../../../../pages/rplpage/RplPage'
import { RPLTableRow } from "./RPLTableRow"

type Props = {
    data : IRPLTable[]
    missed_forecasts? : IRPLForecasts[]
}

export const RPLTable : FC<Props> = (props) => {
    return <>
        {props.data.map((el, index)=>{
           return (
            <RPLTableRow props={el} missed_forecasts={props.missed_forecasts} standings={index + 1} key={index + 1} />
            )
        })}
    </>
}