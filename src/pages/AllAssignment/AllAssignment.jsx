import { useLoaderData } from "react-router-dom";
import AssignmentCard from "./AssignmentCard";
import { useEffect, useState } from "react";
import axios from "axios";


const AllAssignment = () => {
    const [allAssignment, setAllAssignment] = useState([]);
    const [count, setCountItem] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const dropdownValues = ['Easy', 'Medium', 'Hard'];

    const handleDropdownChange = e => {
        e.preventDefault();
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);
    }

    useEffect(() => {
        axios.get(`https://group-study-server-rho.vercel.app/get-assignment?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => setAllAssignment(res.data))
            .catch(err => console.log(err));
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        axios.get('https://group-study-server-rho.vercel.app/assignment-count')
            .then(res => setCountItem(res.data.count))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const updatedFilteredData = allAssignment.filter(item => filter === '' || item.difficulty === filter);
        setFilteredData(updatedFilteredData);
    }, [filter, allAssignment]);

    const handleItemPerPage = e => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="space-y-7">
            <div className="flex gap-5">
                <label className="label">
                    <span className="label-text text-xl font-semibold">Filter By Difficulty Level</span>
                </label>
                <select className="input input-bordered" value={filter} onChange={handleDropdownChange}>
                    <option value="">Show All</option>
                    {dropdownValues.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pagination">
                {
                    filteredData.map(item => <AssignmentCard key={item._id} assignments={item}></AssignmentCard>)
                }
            </div>
            <p className="text-center">current page: {currentPage}</p>

            <div className="flex justify-center space-x-3">
                <button className="bg-green-500 text-white rounded-lg p-2" onClick={handlePrevPage}>prev page</button>
                {
                    pages.map(page => <button
                        className={currentPage === page ? 'underline text-green-500' : undefined}

                        onClick={() => setCurrentPage(page)}
                        key={page}>{page}</button>)
                }
                <button className="bg-green-500 text-white rounded-lg p-2" onClick={handleNextPage}>Next page</button> <span className="flex items-center">per page</span>
                <select name="" id="" onChange={handleItemPerPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default AllAssignment;
