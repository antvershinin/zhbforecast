import { FC } from "react";
import { Outlet } from "react-router";
import style from "./Layout.module.css";
import { Header } from "../header/Header";

export const Layout: FC = () => {
  return (
    <div className={style.outlet}>
      <Header />
      <div className={style.body}>
        <Outlet />
      </div>
    </div>
  );
};
