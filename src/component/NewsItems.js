import React from 'react'

const NewsItems = (props) => {

    let { title, description, imgUrl, newsUrl, siteName, author, date } = props;

    return (
        <div>
            <div className="card" >
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger sit-name" >
                    {siteName}
                </span>
                <img src={imgUrl} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>

                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author}, {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-danger">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItems
