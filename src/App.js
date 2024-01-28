import "./App.css";
import { Navbar } from "src/components/utils/molecule/index";
import { AppRouter } from "./routing/AppRouter";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlices";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./redux/slices/userSlice";

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
