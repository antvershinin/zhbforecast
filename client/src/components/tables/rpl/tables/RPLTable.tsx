import { FC } from "react"
import {IRPLTable} from '../../../../pages/rplpage/RplPage'
import { RPLTableRow } from "./RPLTableRow"

type Props = {
    data : IRPLTable[]
}

export const RPLTable : FC<Props> = (props) => {
    return <>
        {props.data.map((el, index)=>{
           return (
            <RPLTableRow props={el} standings={index + 1} key={index + 1} />
            )
        })}
    </>
}