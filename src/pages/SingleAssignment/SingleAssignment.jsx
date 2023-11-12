
import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";




const SingleAssignment = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const singleAssignment = useLoaderData()
    const [assignment, setAssignment] = useState(singleAssignment)
    const { _id, title, description, mark, difficulty, due, thumbnail, createdBy } = assignment
    const email = user?.email
    const data = { email, _id }
    const selected = { data }
    const handleDelete = () => {
        axios.delete(`https://group-study-server-rho.vercel.app/delete-assignment`, selected)
            .then(res => {

                toast.success(res.data.message)
                setAssignment('')
                navigate('/all-assignments')
            })
            .catch(err => {
                toast.error(err.response.data.message)

            })


    }
    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        const pdf = form.pdf.value
        const note = form.note.value
        const examineeName = user.displayName
        const examineeEmail = user.email
        const status = "pending"

        const data = { pdf, note, examineeEmail, examineeName, status, title, assignmentMark: mark }
        console.log('asignment data: ', data)

        axios.post('https://group-study-server-rho.vercel.app/submit-assignment', data)
            .then(res => {
                console.log(res.data)
                toast.success("Assignment submitted Successfully!")
                navigate('/all-assignments')
            })
            .catch(err => {
                toast.error(err.message)
                console.log(err.message)
            })
    }

    return (
        <div>
            {
                assignment &&

                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src={thumbnail} className="w-72 rounded-lg shadow-2xl" />
                        <div className="space-y-0 lg:space-2">
                            <h1 className="text-5xl font-bold">{title}</h1>
                            <p className="py-6">{description}</p>
                            <p>Difficulty Level: <span className="font-semibold">{difficulty}</span></p>
                            <p>Marks: <span className="font-semibold">{mark}</span> </p>
                            <p>Due: <span className="font-semibold">{due}</span></p>
                            <p>Mail Creator: <span className="font-semibold">{createdBy}</span></p>
                            <div className="flex gap-3 pt-5">

                                <button className="btn btn-success text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Take Assignment</button>
                                
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">

                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        {/* submit pdf abd note of the exanineee */}

                                        <div className="mx-auto flex justify-center">
                                            <form onSubmit={handleSubmit}>
                                                <h3 className="font-bold text-lg py-2">PDF Link</h3>
                                                <input type="text" name="pdf" placeholder="Add the Pdf link.." className="input input-bordered input-secondary w-full max-w-xs" />
                                                <p className="py-2 font-bold text-lg">Add Quick note</p>
                                                <input type="text" name="note" placeholder="Type quick note.." className="input input-bordered input-secondary w-full max-w-xs" />
                                                <input className="btn btn-success text-white mt-5" type="submit" value="submit" />
                                            </form>

                                        </div>
                                    </div>
                                </dialog>



                                <button onClick={handleDelete} className="btn btn-secondary">Delete Assignment</button>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>

    );
};

export default SingleAssignment;