import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
// get all articles
function Articles() {
  const [error, setError] = useState("");
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const {getToken} = useAuth();

  async function getArticles() {
    // get jwt token
    const token = await getToken();
    // make authenticated req
    let res = await axios.get("http://localhost:3000/author-api/articles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.message === "articles") {
      setArticles(res.data.payload);
      console.log(articles);
    } else {
      setError(res.data.message);
    }
  }

  // get specific article
  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="container">
      <div>
        {error.length !== 0 && (
          <p className="display-4 text-center mt-5 text-danger">{error}</p>
        )}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 ">
          {articles.map((articleObj) => (
            <div className="col" key={articleObj.articleId}>
              <div className="card h-100">
                <div className="author-details text-end">
                  <img
                    src={articleObj.authorData.profileImageUrl}
                    width="40px"
                    className="rounded-circle"
                  ></img>
                  <p>
                    <small className="text-secondary">
                      {articleObj.authorData.nameOfAuthor}
                    </small>
                  </p>
                </div>
                <h5 className="card-title">{articleObj.title}</h5>
                <p className="card-text">
                  {articleObj.content.substring(0, 80) + "...."}
                </p>
                <button
                  className="custom-btn btn-4"
                  onClick={() => {
                    gotoArticleById(articleObj);
                  }}
                >
                  Read more
                </button>
              </div>
              <div className="card-footer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
