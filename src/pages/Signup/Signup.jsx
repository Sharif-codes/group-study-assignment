import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { getAuth, updateProfile } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";
import app from "../../../firebase.config";

const auth= getAuth(app)
const Signup = () => {
    const navigate=useNavigate()
    const {createUser}= useContext(AuthContext)

    const [regError, setRegError] = useState('')
    const [passError, setPassError]= useState('')
    const [specialCharError, setSpecialCharError]= useState('')
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    const capital= /[A-Z]/;

    const handleSignup= e=>{
        e.preventDefault()
        setRegError('')
        setPassError('')
        setSpecialCharError('')
        const form= e.target
        const displayName = form.displayName.value
        const photoURL = form.photoURL.value
        const email= form.email.value
        const password= form.password.value
        console.log(email,password,displayName,photoURL)
        if(password.length<6)
        {
            setPassError('password must be longer than 6')
            return;
        }
        if(!specialChars.test(password))
        {
            setSpecialCharError("Password must contain a special character ")
            return;
        }
        if(!capital.test(password))
        {
            setSpecialCharError("Password must contain a capital character ")
            return;
        }
      
            createUser(email,password)
            .then(res=>{
                console.log(res.user)
                updateProfile(auth.currentUser, {
                    displayName: displayName , photoURL: photoURL
                  }).then((result) => {
                    console.log(result)
                  }).catch((error) => {
                    console.log(error)
                  });
                  toast.success('user registered successfully')
                  navigate('/')
            })
            .catch(err=>{
            toast.error(err.message)
        })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignup} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="displayName" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photoURL" placeholder="Your Photo URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                        
                            {
                                regError && <p className="text-red-600 text-center">{regError}</p>
                            }
                            {
                                passError && <p className="text-red-600 text-center">{passError}</p>
                            }
                            {
                                specialCharError && <p className="text-red-600 text-center">{specialCharError}</p>
                            }
                        
                        <p>Already have an account?</p> <Link to='/login' className="text-purple-800">Login now</Link>
                    </form>
                </div>
              
            </div>
        </div>
    );
};

export default Signup;