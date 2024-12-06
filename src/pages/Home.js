
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import BlogSection from "../component/BlogSection";
import Spinner from "../component/Spinner";
import { toast } from "react-toastify";
import Tags from "../component/Tags";
import MostPopular from "../component/MostPopular";
import Trending from "../component/Trending";

const Home = ({ setActive, user, active }) => {
  const [loading,setLoading]=useState(true)
  const [blogs,setBlogs]=useState([])
  const [tags,setTags]=useState([])
  const [trendingBlogs,setTrendingBlogs]=useState([])

  const getTrendingBlogs=async()=>{
    try{
      const docRef=collection(db,"Blogs")
      const queryTrend=query(docRef,where("trending","==","yes"));
      const querySnapshot=await getDocs(queryTrend)
      let trendingBlogs=[]
      querySnapshot.forEach((doc)=>{
          trendingBlogs.push({id:doc.id,...doc.data()})
      })
      setTrendingBlogs(trendingBlogs)
    }catch(err){
      toast.error("error",err.message)
    }
  }

  useEffect(() => {
    getTrendingBlogs()
    const unSub = onSnapshot(
      collection(db, 'Blogs'),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          const docTags = doc.get("tags");
          if (docTags && Array.isArray(docTags)) {
            tags.push(...docTags); 
          }
          list.push({ id: doc?.id, ...doc.data() });
        });
  
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags); 
        setBlogs(list); 
        setLoading(false); 
        setActive("home"); 
      },
      (error) => toast.error(error)
    );
  
    return () => {
      unSub();
      getTrendingBlogs()
    };
  }, []);
  
  const handleDelete=async(id)=>{
    if(window.confirm("Are you sure want to delete this Blogs?")){
      try{
        setLoading(true)
        await deleteDoc(doc(db,'Blogs',id))
        setLoading(false)
        toast.success("Deleted Successfully")
      }catch(err){
        toast.error("error while delete blogs",err.message)
      }
    }
  }

  if(loading){
    return <Spinner/>
  }

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
         <Trending blogs={trendingBlogs} />
         <div style={{ marginBottom: "60px" }}></div>
          <div className="col-md-8">
          <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
          </div>
          <div className="col-md-3">
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;