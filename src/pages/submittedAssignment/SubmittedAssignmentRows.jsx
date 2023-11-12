import { Link } from "react-router-dom";


const SubmittedAssignmentRows = ({ assignment }) => {
    const { _id, title, assignmentMark, examineeName, status, obtainedMark } = assignment

    return (
        <tr className="bg-base-200">
            <th>{title}</th>
            <td>{assignmentMark}</td>
            <td>{examineeName}</td>
            <Link to={`/give-mark/${_id}`}><td><button className="btn btn-secondary">Give Mark</button></td></Link>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
        </tr>
    );
};

export default SubmittedAssignmentRows;