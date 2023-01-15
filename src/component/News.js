import React,{ useEffect,useState } from 'react'
import Loading from './Loading';
import NewsItems from './NewsItems'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=>{

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResultse] = useState(1);
 // document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey `;


  const updateNews =  async ()=> {
    props.setPrgoress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
    setLoading(true);
    props.setPrgoress(30);
    await fetch(url).then(res => res.json(),
    props.setPrgoress(70)).then(dataArticles => {
      setArticles(dataArticles.articles);
      setTotalResultse(dataArticles.totalResults);
      setLoading(false);
    });
    props.setPrgoress(100);
  }

  useEffect(()=>{
    updateNews();
  },[]);



  const fetchMoreData = async () => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
    await fetch(url).then(res => res.json()).then(dataArticles => {
      setArticles(dataArticles.articles);
      setTotalResultse(dataArticles.totalResults);
    });
  };

  // handlePrevClick = async () => {

  //   setState({ page: page - 1 });
  //   updateNews();
  // }

  // handleNextClick = async () => {
  //   if (page + 1 > Math.ceil(totalResults / props.pagesize)) {

  //   } else {

  //     setPage(page+1);
  //     updateNews();
  //   }

  // }

    return (
      <>
        <h1 className='text-center my-4' id='heding-news'>NewsMonkey - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} News</h1>
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row my-3 d-flex ">
              {!loading && articles.map((element) => {
                return <div className="col-md-4 my-2" key={element.url + Math.floor(Math.random() * 10)}>
                  <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 70) : ""} imgUrl={element.urlToImage ? element.urlToImage : 'https://styles.redditmedia.com/t5_2qi4j/styles/communityIcon_a0b0l0lb75k41.png'} newsUrl={element.url} siteName={element.source.name} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button disabled={page <= 1} onClick={handlePrevClick} type="button" className="btn btn-dark">&larr; Previous</button>
            <button disabled={(page + 1 > Math.ceil(totalResults / props.pagesize))} onClick={handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
          </div> */}
          </>
    )

}

News.defaultProps = {
  country: 'us',
  pagesize: 8,
  category: "general",

}
News.propTypes = {
  country: propTypes.string,
  pagesize: propTypes.number,
  category: propTypes.string,

}

export default News
