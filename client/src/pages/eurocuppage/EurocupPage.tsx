import { useEffect } from "react";
import { getEuroMatches } from "../../api/matchesApi";

export const EurocupPage = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await getEuroMatches();
      console.log(response);
    };

    getData();
  }, []);

  return <></>;
};
