import { doc, getDoc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { toast } from 'react-toastify'

const Details = ({setActive}) => {
  const [blogs,setBlogs]=useState(null)
  const {id}=useParams()
  const getBlogDetail=async()=>{
    try{
      const docRef=doc(db,'Blogs',id)
      const blog=await getDoc(docRef)
      setBlogs(blog.data())
      setActive("none")

    }catch(err){
      toast.error(err.message)
    }
  }
  useEffect(()=>{
    id && getBlogDetail()
  },[id])
  return (
    <div className="single">
      <div className="blog-tittle-box" style={{height:"60vh",backgroundImage:`url('${blogs?.imgUrl}')`}}>
        <div className="overlay"></div>
        <div className="blog-tittle">
          <span>{blogs?.Timestamp.toDate().toDateString()}</span>
          <h2>{blogs?.tittle}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
                <span className="meta-info text-start">
                  By <p className='author'>{blogs?.author}</p> -
                  {blogs?.Timestamp.toDate().toDateString()}
                </span>
                <p className="text-start">{blogs?.description}</p>
            </div>
            <div className="col-md-3">
              <h2>Tags</h2>
              <h2>Most Popular</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
