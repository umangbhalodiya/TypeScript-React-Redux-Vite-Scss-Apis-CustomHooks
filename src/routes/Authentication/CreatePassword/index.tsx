import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { login } from "../../../store/ApiSlice/authSlice";

interface ApiResponse {
  token: string;
  user_id: number;
}

export default function CreatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { onChangeRegister } = useAuth();

  const validate = () => {
    let isValid = true;
    if (!user?.username) {
      navigate("/register");
      isValid = false;
      toast.error("Please enter your username");
    } else if (!user?.password) {
      isValid = false;
      toast.error("Please enter your password");
    }
    return isValid;
  };

  function createUser() {
    if (validate()) {
      dispatch(login(user))
        .unwrap()
        .then((res: ApiResponse) => {
          if (res?.token) {
            toast.success("Registration successful 😁");
            navigate("/home");
          } else {
            toast.error("Registration failed 🫤");
          }
        })
        .catch(() => {
          toast.error("Registration failed 🫤");
        });
    }
  }

  console.log("user", user);
  return (
    <div>
      <h1>Welcome to the Create Password page</h1>
      <input
        name="password"
        value={user?.password}
        onChange={onChangeRegister}
        placeholder="Enter your password"
      />
      <button className="" onClick={createUser}>
        Submit
      </button>
    </div>
  );
}
