import { useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { onChangeRegister } = useAuth();
  console.log("user", user);

  useEffect(() => {
    if (!user?.username) {
      navigate("/register");
    }
  }, []);

  function register() {
    navigate("/create-password");
  }

  return (
    <div>
      <h1>Welcome to the Register page</h1>
      <div>username : testadmin </div>
      <div> password : testadmin</div>
      <input
        name="username"
        value={user?.username}
        onChange={onChangeRegister}
        placeholder="Enter your username"
      />
      <button className="" onClick={register}>
        Submit
      </button>
    </div>
  );
}
