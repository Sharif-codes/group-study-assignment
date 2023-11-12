import axios from "axios";
import { useEffect, useState } from "react";
import SubmittedAssignmentRows from "./SubmittedAssignmentRows";

const SubmittedAssignment = () => {
    const [assignments, setAssignments] = useState([])
    useEffect(() => {
        axios.get('https://group-study-server-rho.vercel.app/get-all-submitted-assignment')
            .then(res => setAssignments(res.data))
            .catch(err => console.log(err))
    }, [])
    console.log(assignments)

    return (
        <div>
            <h2 className="text-center text-3xl font-semibold my-10">Total Submission: <span className="text-purple-800"> {assignments.length}</span></h2>
            <div className="overflow-x-auto text-center">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>Assignment Title</th>
                            <th>Assignment Mark</th>
                            <th>Examinee Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assignments?.map(item => <SubmittedAssignmentRows
                                key={item._id}
                                assignment={item}></SubmittedAssignmentRows>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmittedAssignment;