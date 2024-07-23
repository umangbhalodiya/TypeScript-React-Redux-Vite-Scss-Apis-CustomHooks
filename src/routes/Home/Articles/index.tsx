import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useEffect } from "react";
import { fetchArticles } from "../../../store/ApiSlice/articleSlice";
import Learning from "./Learning";
import Photography from "./Photography";

export default function Articles() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <div>
      <Photography />
      <Learning />
    </div>
  );
}
