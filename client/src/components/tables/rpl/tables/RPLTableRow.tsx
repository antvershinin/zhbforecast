import { useState } from "react"
import { IRPLForecasts, IRPLTable } from "../../../../pages/rplpage/RplPage"
import style from './RPLTableRow.module.css'
import Modal from 'react-modal';



export const RPLTableRow = ({props, standings, missed_forecasts} : {props :  IRPLTable, standings : number, missed_forecasts?:IRPLForecasts[]}) => {

    const missed = missed_forecasts?.map(el=>el.user_id)

    const [modalOpen, setModalOpen] = useState(false)

    const handlePress = () => {
        setModalOpen(true)
    }

    const renderMatches = () => {
        const matches: JSX.Element[] = []
        props.matches.forEach(match=> matches.push(
            <div style={{display:'flex', fontSize:20, width:300, justifyContent:'space-around', marginBottom:15}}>
                <div>{match.user1}</div>
                <div>{match.score1}</div>
                <div>:</div>
                <div>{match.score2}</div>
                <div>{match.user2}</div>
            </div>
            
        ))
           
        return matches
    }

    return <div className={standings===1 ? style.gold : standings ===2  ? style.silver : standings === 3 ? style.bronze: style.row}>
        <div className={style.place}>{standings}</div>
        <div className={style.logo}>
            <img style={{width:'100%', height:'100%'}} src={require(`./logos/${props.user_id}.png`)}/>
        </div>
        <div className={style.name} style={missed?.includes(props.user_id)? {color:'#FF2400'} : undefined} onClick={handlePress}>{props.user_name}</div>
        <div className={style.points_main}>{props.points}</div>
        <div className={style.points}>{props.wins}</div>
        <div className={style.points}>{props.draws}</div>
        <div className={style.points}>{props.losses}</div>
        <div className={style.points_big}>{props.forecast_points}</div>
        <div className={style.points}>{props.tours > 0 ? props.tours : '-'}</div>
        <Modal isOpen={modalOpen} style={modalStyle}>
            <button style={{position:'absolute', top:5, right:5, marginBottom:20}} onClick={()=>setModalOpen(false)}>Х</button>
            {renderMatches()}
        </Modal>
    </div>
}

const modalStyle = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }
}