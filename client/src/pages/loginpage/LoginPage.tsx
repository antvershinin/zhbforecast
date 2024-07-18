import { FC, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router";

export const LoginPage: FC = () => {
  const { loginHandler } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleClick: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await loginHandler(login, password);
      navigate('home')
    } catch (e) {
      alert("");
    }
  };

  return (
    <>
      <form
        action=""
        method="get"
        onSubmit={handleClick}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <input
            style={{ height: "20px", width: "200px" }}
            type="text"
            name="login"
            placeholder="Login"
            required
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <input
            style={{ height: "20px", width: "200px" }}
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            style={{ backgroundColor: "gray" }}
            type="submit"
            value="Войти"
          />
        </div>
      </form>
    </>
  );
};
