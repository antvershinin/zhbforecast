import { useNavigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider";
import style from './Header.module.css'
import icon from './icon.png'

export const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  const handleQuit = () => {
    localStorage.removeItem('token')
    navigate('/home')
  }

  return <div className={style.header}>
    <div style={{display:'flex', gap:20}}>
    {user?.is_admin && <div onClick={()=>navigate('/admin')} className={style.button}><p>Админка</p></div>}
    {user && <div onClick={handleQuit} className={style.button}><p>Выйти</p></div>}
    </div>
    <div style={{cursor:'pointer'}} >
      <img onClick={()=>navigate('/')} src={icon}/>
    </div>
 
    <div style={{display:'flex', flexDirection:'column', fontSize:'35px'}}>
    {user ? user.user_name : <div onClick={()=>navigate('/login')} className={style.button}><p>Войти</p></div>}
    </div>
    
    </div>;
};
