import "./App.css";
import { Navbar } from "src/components/molecule/index";
import { AppRouter } from "./routing/AppRouter";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./redux/slices/userSlice";
import Calendar from "./components/molecule/scheduler/scheduler";



function App() {
  const dispatch = useDispatch()
  dispatch(fetchUsers())

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        dispatch(setUser(parsedUserData));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [dispatch]);

  return (
    <>

        <Navbar/>
      <AppRouter/> 
     
    </>
  );
}

export default App;
