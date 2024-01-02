import "./App.css";
import ReactDOM from "react-dom/client";
import React, { lazy, useEffect, useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import { Provider } from "react-redux"
import store from "./utils/store";
import ErrorPage from "./components/ErrorPage"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchVideo from "./components/WatchVideo";
import ChannelPage from "./components/ChannelPage";
import Exprimental from "./components/Experimental";
import Shimmer from "./components/Shimmer";


function App() {
  return (
    <Provider store={store}>
      <div className="overflow-hidden">
        <Header />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainContainer />
      },
      {
        path: "/watch",
        element: <WatchVideo />
      },
      {
        path: "/user",
        element: <ChannelPage />,
      },
      {
        path: "/experimental",
        element: <Exprimental />,
      },
      {
        path: "/shimmer",
        element: <Shimmer />,
      },
    ]
  }
])

export default App;