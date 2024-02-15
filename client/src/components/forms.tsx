export const forms = () => {
  return (
    <>
      {/* <Formik initialValues={initialValues} onSubmit={setResults}>
        {({ values }) => (
          <Form>
            <FieldArray name="matches">
              {() => (
                <div>
                  {values.matches.map((match, index) => (
                    <div key={index}>
                      <div>
                        <label htmlFor={`matches.${index}.team1`}>
                          {matches[index].teams[0]}
                        </label>
                        <Field name={`matches.${index}.score1`} type="text" />
                      </div>
                      <div>
                        <label htmlFor={`matches.${index + 1}.team2`}>
                          {matches[index].teams[1]}
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
      </Formik> */}
    </>
  );
};
