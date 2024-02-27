import style from './RplMatch.module.css'
import { FC } from 'react'
import { IRPLMatch } from '../../../../pages/rplpage/RplPage'

type Props = {
    match : IRPLMatch
}

export const RplMatchItem : FC <Props> = (props) => {
    return <>

        <div className={style.match}>
            <div style={{display:'flex', flexDirection:'row'}}>
            <div className={style.team_name}>{props.match.teams_names[0]}</div>
            <div className={style.score}>{props.match.score1}</div>
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>
            <div className={style.team_name}>{props.match.teams_names[1]}</div>
            <div className={style.score}>{props.match.score2}</div>
            </div>
        </div>
        
    </>
}