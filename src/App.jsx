import { useEffect, useState } from "react";
import Authservice from "./Appwrite/Auth";
import { Login, Logout } from "./Store/Authslice";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Auth Check
    Authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(Login({ userData }));
        } else {
          dispatch(Logout());
        }
      })
      .finally(() => setLoading(false));

  
   
  }, []);

  return !Loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Toaster position="top-center" reverseOrder={false} />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
