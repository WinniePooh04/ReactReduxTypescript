import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { wait } from "./utils/wait";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

const Users = lazy(() => wait(1000).then(() => import("./components/Users")));

const App: React.FC = () => {
  const redirectComponents = (): JSX.Element => {
    return (
      <>
        <NavWrapper />
        {/* Show loading when components are not fully loaded */}
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Suspense>
      </>
    );
  };

  // Define NavWrapper component
  const NavWrapper: React.FC = () => {
    return (
      <>
        <Sidebar>
          <Menu
            menuItemStyles={{
              button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                  backgroundColor: "purple",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <MenuItem component={<Link to="/users" />}> Users </MenuItem>
          </Menu>
        </Sidebar>
      </>
    );
  };

  return (
    <div className="App">
      <Provider store={store}>
        <Router>{redirectComponents()}</Router>
      </Provider>
    </div>
  );
};
export default App;
