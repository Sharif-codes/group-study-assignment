import axios from "axios";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const CreateAssignment = () => {
    const {user}= useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const dropdownValues = ['Easy', 'Medium', 'Hard'];
    const [selectedValue, setSelectedValue] = useState('');
    const handleDropdownChange=e=>{
        setSelectedValue(e.target.value);

    }
    console.log(selectedValue)
    const handleAddAssignment = e => {
        e.preventDefault()
        const form= e.target
        const title= form.title.value
        const description= form.description.value
        const mark= form.marks.value
        const thumbnail= form.thumbnail.value
        const email= user.email
        const data={title,description,mark,thumbnail,due: startDate,difficulty: selectedValue,createdBy:email} 
        
        axios.post('https://group-study-server-rho.vercel.app/add-assignment',data)
        .then(res=> {
            console.log(res.data)
            toast.success("Assignment Added successfully!")
        })
        .catch(err=> {
            toast.error(err.response.data.message)
           })
       
    }
    return (
        <div>
            <div className="bg-[#F4F3F0] ">
            <h2 className="md:text-4xl text-2xl pt-5 text-center font-bold text-purple-800">Create an assignment</h2>
                <form onSubmit={handleAddAssignment}>
                
                    <div className="py-10 md:px-24 px-10 space-y-4">
                        <div className="flex gap-4 w-full pb-4">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Title</span>
                                </label>
                                <input type="text" name="title" placeholder="Assignment Title" className="input input-bordered w-full" required/>
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Description</span>
                                </label>
                                <input type="text" name="description" placeholder="Description" className="input input-bordered w-full" required/>
                            </div>
                        </div>
                        <div className="flex gap-4  w-full">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Thumbnail URL</span>
                                </label>
                                <input type="text" name="thumbnail" placeholder="Enter URL" className="input input-bordered w-full" required/>
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Difficulty Level</span>
                                </label>
                                <select className="input input-bordered w-full" value={selectedValue} onChange={handleDropdownChange} required>
                                <option>Select Difficulty Level</option>
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
                                <input type="number" name="marks" placeholder="Assignment Marks" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text ">Due Date</span>
                                </label>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="input input-bordered w-full" required/>
                            </div>
                        </div>


                        <input className="btn btn-block btn-success" type="submit" value="Add Assignment" />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateAssignment;