import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homepage/HomePage";
import { useAuth } from "./providers/AuthProvider";
import { RplPage } from "./pages/rplpage/RplPage";
import { Loader } from "./components/loader/Loader";
import { EurocupPage } from "./pages/eurocuppage/EurocupPage";
import { LoginPage } from "./pages/loginpage/LoginPage";

const App: FC = () => {
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


  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/rpl" element={<RplPage />} />
            <Route path="/euro" element={<EurocupPage />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
