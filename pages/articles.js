
import CardArticle from "../src/components/card-article";

import { useState, useEffect } from "react";

import { useRecoilState } from "recoil";
import {articleRecoil} from "../src/state/atoms/articles";
import baseURL from "../src/static/baseURL";

function Articles() {

    const [articles, setArticles] = useRecoilState(articleRecoil);

    useEffect(() => {
      if(articles.length === 0)
      baseURL.get('/api/article')
        .then(res => {
          setArticles(res?.data?.data)
        })
        .catch(err => {
          console.log(err)
        })
    },[])

    return (
        <div className="container">
            <div className="row my-5 py-5">
                {articles.map((article, index) => (
                  <div className="col-lg-4 col-md-6 p-3" key={index+'ARTICLE'}>
                    <CardArticle image={article.image} title={article.title} description={article.short_description}  />
                  </div>
                ))} 
            </div>
        </div>
    );
}

export default Articles;