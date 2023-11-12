import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import MyAssignmentRows from "./MyAssignmentRows";


const MyAssignment = () => {
    const {user}= useContext(AuthContext)
    const email= user.email
    const [assignments, setAssignment]= useState([])
    useEffect(()=>{
        axios.get(`https://group-study-server-rho.vercel.app/get-submitted-assignment/${email}`)
        .then(res=> setAssignment(res.data))
        .catch(err=> console.error(err))
    })
    return (
        <div>
             <h2 className="text-center text-3xl font-semibold my-10">My Total Submission: <span className="text-purple-800"> {assignments.length}</span></h2>
            <div className="overflow-x-auto text-center">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>Assignment Title</th>
                            <th>Status</th>
                            <th>Assignment Mark</th>
                            <th>Obtained Mark</th>
                            <th>Feedback from Examinee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assignments?.map(item => <MyAssignmentRows
                             key={item._id}
                             assignment={item}
                            ></MyAssignmentRows> )
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default MyAssignment;