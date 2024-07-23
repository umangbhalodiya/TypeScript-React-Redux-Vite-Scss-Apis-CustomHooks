import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setUserStates } from "../store/ApiSlice/authSlice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setUserStates({ user: { ...user, [e.target.name]: e.target.value } })
    );
  };

  const userLogOut = () => {
    dispatch(
      setUserStates({ user: { username: "", password: "" }, isLoggedIn: false })
    );
    localStorage.clear();
    sessionStorage.clear();
    navigate("/register");
  };

  return { onChangeRegister, userLogOut };
};

export default useAuth;
