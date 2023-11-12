import { useContext } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../../firebase.config";

const Login = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider(app);
    const handleLogin = e => {
        e.preventDefault()
        const toastId = toast.loading('Logging in')
        const form = e.target
        
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)

        try {
            login(email, password)
                .then(res => {
                    toast.success('user logged in successfully', { id: toastId })
                    console.log(res)
                    navigate(location?.state ? location?.state : '/')
                    // const user = { email }
                    // axios.post('https://group-study-server-rho.vercel.app/jwt', user, { withCredentials: true })
                    //     .then(res => {
                    //         console.log(res.data)
                    //         if (res.data.success) {
                               
                    //         }
                    //     })
                })
                .catch(err=>{
                    toast.error(err.message, { id: toastId })
                })
            
        }
        catch (err) {
            
            console.log(err)

        }
    }
    const handleGoogleLogin = () => {
        const toastId = toast.loading('Logging in')
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result)
                toast.success('user logged in successfully', { id: toastId })
                navigate(location?.state ? location.state : '/')
                
            })
            .catch(err => {
                console.log(err)
                toast.error(err.message, { id: toastId })
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
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
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                        <p className="text-center">or <Link to='/signup' className="text-purple-800 font-semibold">Sign up</Link> </p>
                    </form>
                    <p className="text-center mb-2 font-semibold ">Login With Google</p>
                    <button onClick={handleGoogleLogin} className="btn btn-outline mx-auto w-1/2 mb-4">
                            <FaGoogle></FaGoogle>
                            Google
                        </button>
                </div>
            </div>
        </div>
    );
};

export default Login;