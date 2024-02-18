import { useNavigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider";
import style from './Header.module.css'
import icon from './icon.png'

export const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  return <div className={style.header}>
    <div >
      <img onClick={()=>navigate('/')} src={icon}/>
    </div>
    <div style={{fontSize:'35px'}}>
    {user ? user.user_name : <div onClick={()=>navigate('/login')} className={style.button}><p>Войти</p></div>}
    
    </div>
    </div>;
};
