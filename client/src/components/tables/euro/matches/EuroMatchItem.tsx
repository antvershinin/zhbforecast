import style from './EuroMatch.module.css'
import { IEuroMatch } from '../../../../pages/eurocuppage/EurocupPage'
import { FC } from 'react'

type Props = {
    match : IEuroMatch
}

export const EuroMatchItem : FC <Props> = (props) => {
    return <>

        <div className={props.match.is_double ? style.match_double : style.match}>
            <div style={{display:'flex', flexDirection:'row'}}>
            <div className={style.team_name}>{props.match.teams[0]}</div>
            <div className={style.score}>{props.match.score1}</div>
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>
            <div className={style.team_name}>{props.match.teams[1]}</div>
            <div className={style.score}>{props.match.score2}</div>
            </div>
        </div>
        
    </>
}