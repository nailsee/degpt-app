import React, { lazy } from "react";

const routerConfig = [
  {
    path: "/home",
    Element: lazy(() => import("@/pages/home")),
    meta: {
      title: 'home'
    }
  },
  {
    path: "/market",
    Element: lazy(() => import("@/pages/market")),
    meta: {
      title: 'market'
    }
  },
  {
    path: "/mining",
    Element: lazy(() => import("@/pages/mining")),
    meta: {
      title: 'mining'
    }
  },
  {
    path: "/bridge",
    Element: lazy(() => import("@/pages/bridge")),
    meta: {
      title: 'bridge'
    }
  },

];
export default routerConfig;
