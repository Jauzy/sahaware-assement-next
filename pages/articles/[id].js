
import {useRecoilState} from 'recoil';
import {currentArticleRecoil} from '../../src/state/atoms/articles';

import {useEffect} from 'react'
import {useRouter} from 'next/router';

import baseURL from '../../src/static/baseURL'

function DetailArticle() {
    const router = useRouter()
    const [currentArticle, setCurrentArticle] = useRecoilState(currentArticleRecoil);
    const { id } = router.query
    

    useEffect(() => {
        baseURL.get(`/api/article/${id}`)
        .then(res => {
            console.log(res)
            setCurrentArticle(res?.data);
        }).catch(err => {
            console.log(err);
        })
    }, [id])

    return (
        <div className='container pt-2 pb-5'>
            <h2 style={{marginTop:'3em'}} className="h1">
                {currentArticle.title}
            </h2>
            <div className='badge bg-danger'>
                {currentArticle.article_category?.title}
            </div>
            <h2 className='h5 my-4' style={{fontWeight:'normal'}}>
                {currentArticle.short_description}
            </h2>
            <img src={'http://localhost:7000/'+currentArticle.image} className="w-100 mb-5" style={{maxHeight:'1000px', objectFit:'cover', objectPosition: 'top'}} />
            
            <div dangerouslySetInnerHTML={{ __html: currentArticle.description }} />
        </div>
    );
}

export default DetailArticle;