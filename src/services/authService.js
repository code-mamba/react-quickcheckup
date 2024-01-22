import { doAuth } from "src/redux/slices/authSlices"
import { dispatch } from "src/redux/store/store"


export const login = (values, isAuthenticated, userData, loginType) =>{
    dispatch(doAuth(values))
    if(isAuthenticated){
        localStorage.setItem("user", JSON.stringify(userData));
        if(localStorage.getItem("user")){
            return "SuccessFully Logged in"
        }
        else{
            return "Unable to save user"
        }
    }
    else{
        return "wrong credentail or user doesn't exist";
    }
}

