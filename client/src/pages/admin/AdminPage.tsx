import React, { useEffect, useState } from "react";
import { editScoreRPL, getTeams, ITeam, setRPLMatches, setRPLTourWinner } from "../../api/adminApi";
import { JSX } from "react/jsx-runtime";
import { getRplMatches } from "../../api/matchesApi";
import { IRPLMatch } from "../rplpage/RplPage";

export interface ISetRPLMatch {
  teams: string[];
  teams_names: string[];
}

interface IEditMatch {
    id:string,
    score1:number,
    score2:number
}

export const AdminPage = () => {
  const [data, setData] = useState<ITeam[]>([]);
  const [tourMatches, setTourMatches] = useState<IRPLMatch[]>([]);
  const [users, setUsers] = useState<{user_id : string, user_name : string}[]>([])

  const match: ISetRPLMatch[] = [];
  for (let i = 0; i < 8; i++) {
    match[i] = {
      teams: [],
      teams_names: [],
    };
  }

  
  const makeTour = () => {
      const handleChange = (
        value: string,
        matchNumber: number,
        teamNumber: number
      ) => {
        const data = JSON.parse(value);
        match[matchNumber].teams[teamNumber] = data.id;
        match[matchNumber].teams_names[teamNumber] = data.name;
      };
    const matches: JSX.Element[] = [];
    
    for (let i = 0; i < 8; i++) {
      matches.push(
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            gap: 30,
          }}
        >
          <select
            defaultValue={"def1"}
            onChange={(e) => handleChange(e.target.value, i, 0)}
          >
            <option disabled value={"def1"}>
              Команда 1
            </option>
            {data &&
              data.map((el) => (
                <option key={el.id} value={JSON.stringify(el)}>
                  {el.name}
                </option>
              ))}
          </select>
          <p>:</p>
          <select
            defaultValue={"def2"}
            onChange={(e) => handleChange(e.target.value, i, 1)}
          >
            <option disabled value={"def2"}>
              Команда 2
            </option>
            {data &&
              data.map((el) => (
                <option key={el.id} value={JSON.stringify(el)}>
                  {el.name}
                </option>
              ))}
          </select>
        </div>
      );
    }
    matches.push(
      <button onClick={() => setRPLMatches(match)}>Отправить матчи</button>
    );
    return matches;
  };

  const editScore = () => {
    const matches: JSX.Element[] = [];
    const editMatch : IEditMatch = {
        id: "",
        score1: 0,
        score2: 0
    }

    const handleSubmit = async (i:number) => {
        editMatch.id = tourMatches[i]._id
        await editScoreRPL(editMatch)
    }

    for (let i = 0; i < 8; i++) {
      matches.push(
        <form
        onSubmit={()=>handleSubmit(i)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 325,
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div style={{ width: 145 }}>{tourMatches[i].teams_names[0]}</div>
            <input
            onChange={(e)=>editMatch.score1 = Number(e.target.value)}
              style={{ width: 20 }}
            ></input>
            <p>:</p>
            <input
           onChange={(e)=>editMatch.score2 = Number(e.target.value)}
              style={{ width: 20 }}
            ></input>
            <div style={{ width: 145, display: "flex", justifyContent: "end" }}>
              {tourMatches[i].teams_names[1]}
            </div>
          </div>
          <button type="submit">Отправить счет</button>
        </form>
      );
    }
    return matches;
  };

  const setTourWinner = () => {
    const options : JSX.Element[] = []
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const winnerObj = JSON.parse(e.target.value)
        winner = winnerObj.user_id
    }
    let winner = ''
    users && options.push(<>
        <select onChange={(e)=>handleChange(e)}>      
        {users &&
              users.map((el) => (
                <option key={el.user_id} value={JSON.stringify(el)}>
                  {el.user_name}
                </option>
              ))}  
        </select>
        <button onClick={()=>setRPLTourWinner(winner)}>Отправить</button>
        </>)
        return options
    }
  

  useEffect(() => {
    const getData = async () => {
      const teams = await getTeams();
      const tour = await getRplMatches();
      setData(teams);
      setTourMatches(tour.tour.matches);
      const users: {user_id : string, user_name : string}[] = []
      tour.tour.table.forEach((el: { user_id: string; user_name : string })=>{
        users.push({user_id : el.user_id, user_name: el.user_name})
      })
      setUsers([...users])
    };
    getData();
  }, []);

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 30 }}
      >
        {makeTour()}
      </div>
      {users && (
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 30  }}>
        {setTourWinner()}
      </div>
      )}
      {tourMatches.length && (
          <div style={{ display: "flex", flexDirection: "column" }}>
          {editScore()}
        </div>
      )}
    </div>
  );
};
