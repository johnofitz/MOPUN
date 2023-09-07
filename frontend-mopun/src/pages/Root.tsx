import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNavBoard";


const RootLayout =()=>{
    return (
        <>
          <MainNav />
          <main>
            {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
            <Outlet />
          </main>
        </>
      );
}

export default RootLayout;