import "./baseLayout.less";
import Header from "@/components/header";
import Router from "@/routes";
import { Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <section id="mainContainer" className={"main"}>
      <Header />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
