import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp,  updateDoc } from "firebase/firestore";
import {toast} from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";

const AddEditBlog = ({user}) => {
  const {id}=useParams()
  const initialisation = {
    tittle: "",
    tags: [],
    trending: "",
    category: "",
    description: "",
  };
  const [file, setFile] = useState(null);
  const [form, setForm] = useState(initialisation);
  const [progress, setProgress] = useState(null);
  const navigate=useNavigate()
  const getBlogDetailById=async()=>{
    try{
      const docRef=doc(db,"Blogs",id)
      const snapshot=await getDoc(docRef)
      if(snapshot.exists()){
        setForm({...snapshot.data()})
      }
    }catch(err){
      toast.error("error",err.message)
    }
  }
  useEffect(()=>{
    id && getBlogDetailById()
  },[])
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!id){
      try{
        await addDoc(collection(db,'Blogs'),{
          ...form,
          author:user?.displayName,
          userId:user?.uid,
          Timestamp:serverTimestamp()
        })
        toast.success("Blog Created Successfully")
        navigate("/")
      }catch(err){
        toast.error("Error while creating Blog",err.message)
      }
    }else{
      try{
        
        await updateDoc(doc(db,'Blogs',id),{
          ...form,
          author:user?.displayName,
          userId:user?.uid,
          Timestamp:serverTimestamp()
        })
        toast.success("Blog Updated Successfully")
        navigate("/")
      }catch(err){
        toast.error("Error while updating Blog",err.message)
      }
    }
  }
  const onCategoryChange = (e) => {
    setForm((prev) => ({ ...prev, category: e.target.value }));
  };
  
  useEffect(() => {  
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload Paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          toast.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const categoty = [
    "fashion",
    "Technology",
    "Food",
    "Travel",
    "sport",
    "Business",
  ];
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="colo-12">
          <div className="text-center py-2">{id?"Update Blog":"Create Blog"}</div>
        </div>
        <div className="row h-100 justify-content-center align-item-center">
          <div className="col-10 md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-2">
                <input
                  type="text"
                  name="tittle"
                  className="form-control input-box-control"
                  placeholder="Tittle"
                   value={form.tittle}
                  onChange={handleChange}
                  id=""
                />
              </div>
              <div className="col-12 py-2">
                <ReactTagInput
                  tags={form.tags}
                  placeholder="Tags"
                  onChange={handleTags}
                />
              </div>
              <div className="col-12 py-2">
                <p className="trending">Is this trending ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    name="radioOption"
                    checked={form.trending === "yes"}
                    className="form-check-input"
                    value="yes"
                    onClick={handleTrending}
                    id=""
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    {" "}
                    Yes &nbsp;
                  </label>
                  <input
                    type="radio"
                    name="radioOption"
                    checked={form.trending === "no"}
                    className="form-check-input"
                    value="no"
                    onClick={handleTrending}
                    id=""
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="col-12 py-2 ">
                <select
                  value={form.category}
                  onChange={onCategoryChange}
                  id=""
                  className="catg-dropDown"
                >
                  <option value="">Please select Category</option>
                  {categoty.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="Description"
                  value={form.description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div> */}
              <div className="col-12 py-3 text-center">
                <button className="btn btn-add" type="submit">
                  {id?"Update":"Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
