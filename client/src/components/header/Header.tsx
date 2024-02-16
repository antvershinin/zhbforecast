import { useAuth } from "../../providers/AuthProvider";

export const Header = () => {
  const { user } = useAuth();
  return <>{user ? user.user_name : <div>Войти</div>}</>;
};
