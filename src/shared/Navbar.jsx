import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    console.log(user)
    const handleLogout = () => {
        logOut()
    }
    const NavItem = <>
        <NavLink
            to="/create-assignments"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active bg-green-500 text-white rounded-md" : ""
            }
        >
            <li><a> Create Assignments</a></li>
        </NavLink>
        <NavLink
            to="/my-assignments"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active bg-green-500 text-white rounded-md" : ""
            }
        >
            <li><a>My Assignments</a></li>
        </NavLink>
        <NavLink
            to="/submitted-assignments"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active bg-green-500 text-white rounded-md" : ""
            }
        >
            <li><a>Submitted Assignments</a></li>
        </NavLink>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {user && NavItem}
                        <NavLink
                            to="/all-assignments"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active bg-green-500 text-white rounded-md" : ""
                            }
                        >
                            <li><a>All Assignments</a></li>
                        </NavLink>
                        <NavLink
                            to="/login"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active bg-green-500 text-white rounded-md" : ""
                            }
                        >
                            <li><a href="">Login</a></li>
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active bg-green-500 text-white rounded-md" : ""
                            }
                        >
                            <li><a href="">Register</a></li>
                        </NavLink>
                    </ul>
                </div>

                <Link to='/' className="flex items-center gap-3"><div className="flex items-center gap-3">
                    <img className="w-[80px]" src="study-group-logo-free-vector.jpg" alt="" /> 
                    <p className="text-2xl font-bold text-secondary-focus hidden md:block">Group Study</p>
                    </div>
                    </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {user && NavItem}
                    <NavLink
                        to="/all-assignments"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active bg-green-500 text-white rounded-md" : ""
                        }
                    >
                        <li><a>All Assignments</a></li>
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active bg-green-500 text-white rounded-md" : ""
                        }
                    >
                        <li><a href="">Login</a></li>
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active bg-green-500 text-white rounded-md" : ""
                        }
                    >
                        <li><a href="">Register</a></li>
                    </NavLink>
                </ul>
            </div>
            <div className="navbar-end flex space-x-5 mx-auto">
                <div>
                    {
                        user && <div className="w-12 mx-auto rounded-full">
                            <Tooltip title={user.displayName} disableInteractive>
                                <img className="w-full rounded-full" src={user.photoURL} alt="" />
                            </Tooltip>

                        </div>
                    }
                </div>
                <div>

                    {
                        user ? <button onClick={handleLogout} className="btn btn-secondary text-white">Logout</button> : <Link to='/login'><button className="btn btn-success text-white">Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;