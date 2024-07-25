import rpl from "../../assets/rpl-logo.png";
import style from "./HomePage.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";

export const HomePage = () => {
  const navigate = useNavigate();
  const { user, loginHandler, getmeHandler } = useAuth();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);  

    }
    const setuser = async () => {
      const res = await getmeHandler()
      };
    setuser();
    setLoading(false);


  }, [getmeHandler, token]);


  return (
    <div className={style.main}>
      <div className={style.image_wrapper} onClick={() => navigate("/rpl")}>
        <img src={rpl} alt="RPL" className={style.image} />
      </div>
    </div>
  );
};
 