import { IEuroTable } from "../../../../pages/eurocuppage/EurocupPage"
import style from './EuroTableRow.module.css'


export const EuroTableRow = ({props, standings} : {props :  IEuroTable, standings : number}) => {
    
    return <div className={standings===1 || standings ===2 ? style.gold : style.silver}>
        <div className={style.place}>{standings}</div>
        <div className={style.name}>{props.user_name}</div>
        <div className={style.points_main}>{props.forecast_points}</div>
        <div className={style.points}>{props.exact}</div>
        <div className={style.points}>{props.difference}</div>
        <div className={style.points}>{props.outcome}</div>
    </div>
}