import { FC } from "react"
import { IEuroTable } from "../../../../pages/eurocuppage/EurocupPage"
import { EuroTableRow } from "./EuroTableRow"

type Props = {
    data : IEuroTable[]
}

export const EuroTable : FC<Props> = (props) => {
    return <>
        {props.data.map((el, index)=>{
           return (
            <EuroTableRow props={el} standings={index + 1} key={index + 1} />
            )
        })}
    </>
}