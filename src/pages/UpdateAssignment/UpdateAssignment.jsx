import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";


const UpdateAssignment = () => {
    const navigate= useNavigate()
    const assignment= useLoaderData()
    const {_id,title,description,mark,difficulty,due,thumbnail,createdBy}= assignment

    const {user}= useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const dropdownValues = ['Easy', 'Medium', 'Hard'];
    const [selectedValue, setSelectedValue] = useState('');
    const handleDropdownChange=e=>{
        setSelectedValue(e.target.value);

    }
    console.log(selectedValue)
    const handleUpdateAssignment = e => {
        e.preventDefault()
        const form= e.target
        const title= form.title.value
        const description= form.description.value
        const mark= form.marks.value
        const thumbnail= form.thumbnail.value
        const email= user.email
        const data={title,description,mark,thumbnail,due: startDate,difficulty: selectedValue,createdBy:email} 
        console.log(data)
        axios.put(`https://group-study-server-rho.vercel.app/updated-assignment/${_id}`,data)
        .then(res=>{
            console.log(res)
            toast.success("Assignment Updated Successfully!")
            navigate('/all-assignments')
        })
        .catch(err=> console.log(err))
    }
    console.log(assignment)
    return (
        <div>
            <div className="bg-[#F4F3F0] ">
            <h2 className="md:text-4xl text-2xl pt-5 text-center font-bold text-purple-800">Update: <span className="text-green-600">{title}</span> </h2>
                <form onSubmit={handleUpdateAssignment}>
                
                    <div className="py-10 md:px-24 px-10 space-y-4">
                        <div className="flex gap-4 w-full pb-4">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Title</span>
                                </label>
                                <input type="text" defaultValue={title} name="title" placeholder="Assignment Title" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Description</span>
                                </label>
                                <input type="text" defaultValue={description} name="description" placeholder="Description" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className="flex gap-4  w-full">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Thumbnail URL</span>
                                </label>
                                <input type="text" defaultValue={thumbnail} name="thumbnail" placeholder="Enter URL" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Difficulty Level</span>
                                </label>
                                <select className="input input-bordered w-full" value={selectedValue} onChange={handleDropdownChange} defaultValue={difficulty}>
                                  
                                    {dropdownValues.map((value, index) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex  gap-4 w-full pb4">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Marks</span>
                                </label>
                                <input type="number" defaultValue={mark} name="marks" placeholder="Assignment Marks" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Due Date</span>
                                </label>
                                <DatePicker defaultValue={due} selected={startDate} onChange={(date) => setStartDate(date)} className="input input-bordered w-full" />
                            </div>
                        </div>


                        <input className="btn btn-block bg-[#D2B48C]" type="submit" value="Update Assignment" />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateAssignment;