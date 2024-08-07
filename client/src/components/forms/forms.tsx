import { Field, FieldArray, Form, Formik } from "formik";
import { FC } from "react";
import { IEuroMatch } from "../../pages/eurocuppage/EurocupPage";
import { setEuro24ForecastsDB, setEuroForecastsDB } from "../../api/matchesApi";
import { useNavigate } from "react-router";

type Props = {
  matches: IEuroMatch[];
  euro24:boolean
};

export const EuroForecastForm: FC<Props> = (props) => {
  const initialValues = props.matches;

  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const result = props.euro24 ? await setEuro24ForecastsDB(values.matches) : await setEuroForecastsDB(values.matches);
      if (result === 200) {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }

  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <FieldArray name="matches">
              {() => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "300px",
                  }}
                >
                  {values.map((match, index) => (
                    <div
                      style={{
                        display: "flex",
                        width: "400px",
                        fontSize: "20px",
                        fontFamily: "Mitr",
                        justifyContent: "center",
                      }}
                      key={index}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "30px",
                        }}
                      >
                        <div
                          style={{
                            width:"120px",
                          }}
                        >
                          <label htmlFor={`matches.${index}.team1`}>
                            {props.matches[index].teams[0]}
                          </label>
                        </div>
                        <div style={{ width: "20px" }}>
                          <Field
                            name={`matches.${index}.score1`}
                            type="number"
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "50px",
                        }}
                      >
                        <div style={{ width: "21px", marginLeft: "30px" }}>
                          <Field
                            name={`matches.${index}.score2`}
                            type="number"
                          />
                        </div>
                        <div style={{ width: "120px" }}>
                          <label htmlFor={`matches.${index + 1}.team2`}>
                            {props.matches[index].teams[1]}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <button
              style={{
                backgroundColor: "rgb(192, 164, 7)",
                height: "50px",
                fontSize: "20px",
                borderRadius: "10px",
              }}
              type="submit"
            >
              Отправить
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
