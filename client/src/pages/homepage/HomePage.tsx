import rpl from "../../assets/rpl-logo.png";
import euro from "../../assets/euro_logo.png";
import style from "./HomePage.module.css";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.main}>
      <div className={style.image_wrapper} onClick={() => navigate("/rpl")}>
        <img src={rpl} alt="RPL" className={style.image} />
      </div>
      <div className={style.image_wrapper}>
        <img
          src={euro}
          alt="RPL"
          className={style.image}
          onClick={() => navigate("/euro")}
        />
      </div>
    </div>
  );
};
