import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNav.module.css";

const MainNav = () => {

  const token:any = useRouteLoaderData("root");
  


  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
        {!token &&  (
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
        )}
          {token && (
            <li>
              <NavLink
                to="/mop"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Patrol Form
              </NavLink>
            </li>
          )}
          {!token && (
            <li>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {token && (
        <Form action="/logout" method="post">
          <button className={classes.Mainbutton}>Logout</button>
        </Form>
      )}
    </header>
  );
};

export default MainNav;
