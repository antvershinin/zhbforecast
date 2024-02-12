import { Field, FieldArray, Form, Formik } from "formik";
import "./App.css";
import Select from "react-select";

function App() {
  const data = [
    {
      _id: "65c4b235551ea7aeccb00f49",
      id: "kras",
      name: "Краснодар",
      logo: "",
      user_id: "65c5ce921a03da086dd45197",
      user_name: "Лёха Р.",
    },
    {
      _id: "65c4b235551ea7aeccb00f4a",
      id: "zen",
      name: "Зенит",
      logo: "",
      user_id: "65c5cc9f1a03da086dd45182",
      user_name: "Серёга П.",
    },
    {
      _id: "65c4b235551ea7aeccb00f4b",
      id: "dyn",
      name: "Динамо",
      logo: "",
      user_id: "65c5ce731a03da086dd4518d",
      user_name: "Лёха К.",
    },
    {
      _id: "65c4b235551ea7aeccb00f4c",
      id: "loko",
      name: "Локомотив",
      logo: "",
      user_id: "65c5cc511a03da086dd45178",
      user_name: "Лёня",
    },
    {
      _id: "65c4b235551ea7aeccb00f4d",
      id: "spm",
      name: "Спартак",
      logo: "",
      user_id: "65c5cc641a03da086dd4517a",
      user_name: "Ваня",
    },
    {
      _id: "65c4b235551ea7aeccb00f4e",
      id: "kryl",
      name: "Крылья Советов",
      logo: "",
      user_id: "65c5cc6c1a03da086dd4517c",
      user_name: "Дима Р.",
    },
    {
      _id: "65c4b235551ea7aeccb00f4f",
      id: "rub",
      name: "Рубин",
      logo: "",
      user_id: "65c5ce891a03da086dd45195",
      user_name: "Кир",
    },
    {
      _id: "65c4b235551ea7aeccb00f50",
      id: "cska",
      name: "ЦСКА",
      logo: "",
      user_id: "65c5ce971a03da086dd45199",
      user_name: "Стас",
    },
    {
      _id: "65c4b235551ea7aeccb00f51",
      id: "pari",
      name: "Пари НН",
      logo: "",
      user_id: "65c5cca41a03da086dd45184",
      user_name: "Слава",
    },
    {
      _id: "65c4b235551ea7aeccb00f52",
      id: "rost",
      name: "Ростов",
      logo: "",
      user_id: "65c5cc7b1a03da086dd45180",
      user_name: "Дима Д.",
    },
    {
      _id: "65c4b235551ea7aeccb00f53",
      id: "fak",
      name: "Факел",
      logo: "",
      user_id: "65c5ce651a03da086dd4518b",
      user_name: "Дед",
    },
    {
      _id: "65c4b235551ea7aeccb00f54",
      id: "ural",
      name: "Урал",
      logo: "",
      user_id: "65c5cc3f1a03da086dd45176",
      user_name: "Серёга Дж.",
    },
    {
      _id: "65c4b235551ea7aeccb00f55",
      id: "akhm",
      name: "Ахмат",
      logo: "",
      user_id: "65c5cc771a03da086dd4517e",
      user_name: "Дима У.",
    },
    {
      _id: "65c4b235551ea7aeccb00f56",
      id: "oren",
      name: "Оренбург",
      logo: "",
      user_id: "65c5ce7f1a03da086dd45191",
      user_name: "Шура",
    },
    {
      _id: "65c4b235551ea7aeccb00f57",
      id: "balt",
      name: "Балтика",
      logo: "",
      user_id: "65c5ce851a03da086dd45193",
      user_name: "Паша",
    },
    {
      _id: "65c4b235551ea7aeccb00f58",
      id: "soch",
      name: "Сочи",
      logo: "",
      user_id: "65c5ce7b1a03da086dd4518f",
      user_name: "Антоха",
    },
  ];

  return (
    <div>
      <h1>Forecast</h1>
      {/* <Formik initialValues={{ team1: "", team2: "" }} /> */}
    </div>

    // <div>
    //   <h1>Forecast</h1>
    //   <Formik initialValues={initialValues} onSubmit={setResults}>
    //     {({ values }) => (
    //       <Form>
    //         <FieldArray name="matches">
    //           {() => (
    //             <div>
    //               {values.matches.map((match, index) => (
    //                 <div key={index}>
    //                   <div>
    //                     <label htmlFor={`matches.${index}.team1`}>
    //                       {matches[index].teams[0]}
    //                     </label>
    //                     <Field name={`matches.${index}.score1`} type="text" />
    //                   </div>
    //                   <div>
    //                     <label htmlFor={`matches.${index + 1}.team2`}>
    //                       {matches[index].teams[1]}
    //                     </label>
    //                     <Field name={`matches.${index}.score2`} type="text" />
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           )}
    //         </FieldArray>
    //         <button type="submit">Invite</button>
    //       </Form>
    //     )}
    //   </Formik>
    // </div>
  );
}

export default App;
