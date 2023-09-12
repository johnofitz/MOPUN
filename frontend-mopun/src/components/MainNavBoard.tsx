import { Form, NavLink } from "react-router-dom";
import classes from "./MainNav.module.css";

const MainNav = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
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
          {/* {!token && ( */}
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
          {/* )}
              {token && ( */}
          {/* <li>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </li> */}
          {/* )} */}
        </ul>
      </nav>
      <Form action="/logout" method="post">
        <button className={classes.Mainbutton}>Logout</button>
      </Form>
    </header>
  );
};

export default MainNav;
