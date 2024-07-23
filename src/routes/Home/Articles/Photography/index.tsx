import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Article } from "../../../../store/ApiSlice/articleSlice";

export default function Photography() {
  const { articles } = useSelector((state: RootState) => state.articles) as {
    articles: Article[];
  };

  return (
    <div>
      <h1>Welcome to the Photography page</h1>
      <div>
        {articles
          ?.filter((item) => item?.prompt === "Photography")
          ?.map((item: Article) => {
            const date = `${new Date(item?.created_at).getDate()} / ${new Date(
              item?.created_at
            ).getMonth()} / ${new Date(item?.created_at).getFullYear()}  `;
            return (
              <div key={item?.id}>
                <div>{item?.title}</div>
                <div>
                  <img src={item?.image_url} />
                </div>
                <div>{item?.short_description}</div>
                <div>{item?.content}</div>
                <div>{date}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
