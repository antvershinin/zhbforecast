import { IRPLForecasts, IRPLTable } from "../../../../pages/rplpage/RplPage"
import style from './RPLTableRow.module.css'


export const RPLTableRow = ({props, standings, missed_forecasts} : {props :  IRPLTable, standings : number, missed_forecasts?:IRPLForecasts[]}) => {

    const missed = missed_forecasts?.map(el=>el.user_id)

    return <div className={standings===1 ? style.gold : standings ===2  ? style.silver : standings === 3 ? style.bronze: style.row}>
        <div className={style.place}>{standings}</div>
        <div className={style.logo}>
            <img style={{width:'100%', height:'100%'}} src={require(`./logos/${props.user_id}.png`)}/>
        </div>
        <div className={style.name} style={missed?.includes(props.user_id)? {color:'#FF2400'} : undefined} >{props.user_name}</div>
        <div className={style.points_main}>{props.points}</div>
        <div className={style.points}>{props.wins}</div>
        <div className={style.points}>{props.draws}</div>
        <div className={style.points}>{props.losses}</div>
        <div className={style.points_big}>{props.forecast_points}</div>
        <div className={style.points}>{props.tours > 0 ? props.tours : '-'}</div>
    </div>
}

