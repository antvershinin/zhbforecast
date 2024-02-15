import { FC } from "react";
import { Outlet } from "react-router";
import image from './background.png'


export const Layout: FC = () => {
  return <div >

  <Outlet/>

  </div >
};
