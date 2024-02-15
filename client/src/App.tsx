import { FC, PropsWithChildren } from "react";
import { Layout } from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";


const App :FC = () => {

    return (
        <>
        <Routes>
            <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default App