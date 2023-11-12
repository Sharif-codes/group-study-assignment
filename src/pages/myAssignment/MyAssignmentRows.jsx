

const MyAssignmentRows = ({assignment}) => {
    const {pdf, note, examineeEmail,examineeName,status,title,mark,feedback,assignmentMark}= assignment
    return (
        <tr className="bg-base-200">
            <th>{title}</th>
            <td>{status}</td>
            <td>{assignmentMark}</td>
            <td>{mark? mark:'pending'}</td>
            <td>{feedback?feedback:'pending'}</td>
        </tr>
    );
};

export default MyAssignmentRows;