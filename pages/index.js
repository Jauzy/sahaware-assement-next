

import WomanHome from "../src/static/images/woman-home.png"
import Image from 'next/image';
import CardArticle from "../src/components/card-article";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import {articleRecoil} from "../src/state/atoms/articles";
import baseURL from "../src/static/baseURL";

export default function Home() {

  const [articles, setArticles] = useRecoilState(articleRecoil);

  useEffect(() => {
    baseURL.get('/api/article', {params: {page: 1, size: 3}})
      .then(res => {
        setArticles(res?.data?.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[])

  return (
    <div>
      <div className="container" id="woman-home-container">
        <Image id="woman-home" src={WomanHome} className="w-100 mb-1 bg-danger" style={{objectFit:'cover', objectPosition: 'center', marginTop: '7em'}}  />
      </div>
      <div className="container">
          <div className="my-5">
            <h2 className="text-center fw-bolder h1">Articles</h2>   
          </div>

          <div className="row mb-5 pb-5">
            {articles.map((article, index) => {
              if(article.is_visible)
              return (
                <div className="col-lg-4 col-md-6 p-3" key={index+'ARTICLE'}>
                  <CardArticle image={article.image} title={article.title} description={article.short_description} id={article.ar_id} category={article.article_category.title}  />
                </div>
                )
            })} 
          </div>
      </div>
    </div>
  )
}
