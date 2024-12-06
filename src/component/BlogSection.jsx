import React from 'react'
import { excerpt } from '../utility'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'

const BlogSection = ({blogs,user,handleDelete}) => {
  return (
    <div>
        {blogs?.map((item,index)=>(
            <div className='row pb-4' key={item?.id}>
                <div className="col-mb-5">
                    <div className="hover-blogs-img">
                        <div className="blogs-img">
                            <img src={item.imgUrl} alt={item.tittle} />
                            <div></div>
                        </div>  
                    </div>
                </div>
                <div className="col mb-7">
                    <div className="text-start">
                        <h6 className='category catg-color'>{item.category}</h6>    &nbsp;
                        <span className="tittle">{item.tittle}</span>
                        <span className="meta-info">
                            <p className="author">{item.author}</p>-&nbsp;
                            {item.Timestamp.toDate().toDateString()}
                        </span>
                    </div>
                    <div className="short-description text-start">
                        {excerpt(item.description,150)}
                    </div>
                    <Link to={`/detail/${item?.id}`}>
                        <button className="btn btn-read">Read More</button>
                    </Link>
                   {user?.uid && user.uid===item.userId && (
                    <div style={{float:"right"}}>
                        <FontAwesome
                            name='trash'
                            style={{margin:"15px",cursor:"pointer"}}
                            size='2px'
                            onClick={()=>handleDelete(item?.id)}
                        />
                        <Link to={`/update/${item.id}`}>
                            <FontAwesome
                                name='edit'
                                style={{cursor:"pointer"}}
                                size='2px'
                            />
                        </Link>
                    </div>
                   )}
                </div>
            </div>
        ))}
    </div>
  )
}

export default BlogSection
