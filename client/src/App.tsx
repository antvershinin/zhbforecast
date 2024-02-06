import { Field, FieldArray, Form, Formik } from "formik";
import "./App.css";

function App() {
  const user = {
    id: 213,
    team: "Спартак",
  };

  const matches = [
    {
      id: 1,
      team1: "Ростов",
      team2: "Крылья Советов",
      score1: "",
      score2: "",
      finished: "",
    },
    {
      id: 2,
      team1: "ЦСКА",
      team2: "Оренбург",
      score1: "",
      score2: "",
      finished: "",
    },
    {
      id: 3,
      team1: "Краснодар",
      team2: "Рубин",
      score1: "",
      score2: "",
      finished: "",
    },
    {
      id: 4,
      team1: "Ахмат",
      team2: "Урал",
      score1: "",
      score2: "",
      finished: "",
    },
  ];

  const foreCast = {
    user: { id: 213, team: "Спартак" },
    matches: [
      {
        id: 1,
        team1: "Ростов",
        team2: "Крылья Советов",
        score1: "1",
        score2: "2",
        finished: "2",
      },
      {
        id: 2,
        team1: "ЦСКА",
        team2: "Оренбург",
        score1: "1",
        score2: "1",
        finished: "X",
      },
      {
        id: 3,
        team1: "Краснодар",
        team2: "Рубин",
        score1: "2",
        score2: "0",
        finished: "1",
      },
      {
        id: 4,
        team1: "Ахмат",
        team2: "Урал",
        score1: "0",
        score2: "1",
        finished: "2",
      },
    ],
  };
  const result = {
    matches: [
      {
        id: 1,
        team1: "Ростов",
        team2: "Крылья Советов",
        score1: "1",
        score2: "2",
        finished: "2",
      },
      {
        id: 2,
        team1: "ЦСКА",
        team2: "Оренбург",
        score1: "2",
        score2: "0",
        finished: "",
      },
      {
        id: 3,
        team1: "Краснодар",
        team2: "Рубин",
        score1: "3",
        score2: "1",
        finished: "1",
      },
      {
        id: 4,
        team1: "Ахмат",
        team2: "Урал",
        score1: "1",
        score2: "3",
        finished: "2",
      },
    ],
  };

  const userResultMatchday: string[] = [];

  const setResults = () => {
    const forecast = foreCast.matches;
    const results = result.matches;
    for (let i = 0; i < foreCast.matches.length; i++) {
      if (forecast[i].finished !== results[i].finished)
        userResultMatchday.push("0");
      else if (
        forecast[i].score1 === results[i].score1 &&
        forecast[i].score2 === results[i].score2
      )
        userResultMatchday.push("5");
      else if (
        Number(forecast[i].score1) - Number(forecast[i].score2) ==
        Number(results[i].score1) - Number(results[i].score2)
      )
        userResultMatchday.push("2");
      else userResultMatchday.push("1");
    }
    console.log("user results", userResultMatchday);
  };

  // Должно быть [5,0,2,1]

  const initialValues = {
    user,
    matches,
  };

  return (
    <div>
      <h1>Forecast</h1>
      <Formik initialValues={initialValues} onSubmit={setResults}>
        {({ values }) => (
          <Form>
            <FieldArray name="matches">
              {() => (
                <div>
                  {values.matches.map((match, index) => (
                    <div key={index}>
                      <div>
                        <label htmlFor={`matches.${index}.team1`}>
                          {matches[index].team1}
                        </label>
                        <Field name={`matches.${index}.score1`} type="text" />
                      </div>
                      <div>
                        <label htmlFor={`matches.${index + 1}.team2`}>
                          {matches[index].team2}
                        </label>
                        <Field name={`matches.${index}.score2`} type="text" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <button type="submit">Invite</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
