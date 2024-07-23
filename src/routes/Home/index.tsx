import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useAuth from "../../hooks/useAuth";
import Articles from "./Articles";

export default function Home() {
  const { userLogOut } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      <h1>Welcome to the home page {user?.username}</h1>
      <Articles />
      <button onClick={() => {}}>Submit</button>
      <button onClick={userLogOut}>logOut</button>
    </div>
  );
}
