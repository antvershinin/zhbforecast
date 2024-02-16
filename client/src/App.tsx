import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homepage/HomePage";
import { useAuth } from "./providers/AuthProvider";
import { RplPage } from "./pages/rplpage/RplPage";
import { Loader } from "./components/loader/Loader";
import { EurocupPage } from "./pages/eurocuppage/EurocupPage";

const App: FC = () => {
  const { user, loginHandler } = useAuth();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
    }
    const setuser = async () => {
      const res = await loginHandler("wellik11", "aa9911v");
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
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
