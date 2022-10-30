import Image from 'next/image';

function CardArticle({image, title, description}) {
    return ( 
        <div className='card-article rounded'>
            <img src={'http://localhost:7000/'+ image} className="w-100" style={{border: '1px solid #C4C4C4', height: '250px', objectFit: 'cover', objectPosition: 'top'}}  />
            <div className='p-2'>
                <h6 className="mt-2 fw-bolder h4 mb-1 text-justify" >{title}</h6>
                <span className='text-justify'>{description}</span>
            </div>
        </div>
    );
}

export default CardArticle;