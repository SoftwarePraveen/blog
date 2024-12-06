import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


const Auth = ({setActive}) => {
    let initialization = {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        confirmPassword: ""
    }
    const [state, setState] = useState(initialization)
    const [signUp, setSignUp] = useState(false)
    const navigate=useNavigate()
    const { email, password, firstname, lastname, confirmPassword } = state;

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleAuth=async(e)=>{
        try{
            e.preventDefault()
        if(!signUp){
            await signInWithEmailAndPassword(auth,email,password)
            toast.success("Login")
            setActive("home")

        }else{
            if(password!==confirmPassword){
                return toast.error("Password and ConfirmPassword is Not Matched.")
            }
            const {user}=await createUserWithEmailAndPassword(auth,email,password)
            await updateProfile(user,{displayName:`${firstname} ${lastname}`})
            toast.success("Register Sucessfully")
            setActive("home")
        }
        navigate("/")
        }catch(err){
            toast.error(`${err.message}`)
        }
    }

    return (
        <div className="container-fluid mb-4">
            <div className="container">
                <div className="col-12 text-center">
                    <div className="text-center heading py-2">
                        {!signUp ? "Sing-In" : "Sing-Up"}
                    </div>
                </div>
                <div className="row h-100 justify-content-center align-item-center">
                    <div className="colo-10 col-md-8 col-lg-6">
                        <form className='row' onSubmit={handleAuth}>
                            {signUp && (
                                <>
                                    <div className="col-12 py-3">
                                        <input type="text" className='form-control input-text-box' placeholder='firstName' name='firstname' value={firstname} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 py-3">
                                        <input type="text" className='form-control input-text-box' placeholder='lastname' name='lastname' value={lastname} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 py-3">
                                        <input type="password" className='form-control input-text-box' placeholder='ConfirmPassword' name='confirmPassword' value={confirmPassword} onChange={handleChange} />
                                    </div>
                                </>
                            )}
                            <div className="col-12 py-3">
                                <input type="email" className='form-control input-text-box' placeholder='Email' name='email' value={email} onChange={handleChange} />
                            </div>
                            <div className="col-12 py-3">
                                <input type="password" className='form-control input-text-box' placeholder='password' name='password' value={password} onChange={handleChange} />
                            </div>
                            <div className="col-12 py-3 text-center">
                                <button className={`${!signUp ? "btn-sign-in" : "btn-sign-up"}`} type='submit'>{!signUp ? "Sign-In" : "Sign Up"}</button>
                            </div>
                        </form>
                        <div>
                            {!signUp ? (

                                <div className='text-center justify-content-center mt-2 pt-2'>
                                    <p className="small fw-bold mt-2 pt-2 mb-0">
                                        Don't have an account ?
                                        <span className="link-danger" onClick={() => setSignUp(true)} style={{ textDecoration: "none", cursor: "pointer" }}> Sign up</span>
                                    </p>
                                </div>
                            ) :
                                <div className='text-center justify-content-center mt-2 pt-2'>
                                    <p className="small fw-bold mt-2 pt-2 mb-0">
                                        Don't have an account ?
                                        <span className="link-danger" onClick={() => setSignUp(false)} style={{ textDecoration: "none", cursor: "pointer" }}> Sign in</span>
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Auth
