function Employee({firstname, lastname, grade, deleteEmployee,updateEmployee, employeeID}){
    return(
        <div className="alert alert-light bg-dark-subtle shadow-lg">
            {lastname}, {firstname}<span className="badge bg-dark ms-2">{grade}</span>
            <button onClick={()=>{
                deleteEmployee(employeeID, firstname, lastname);
            }}
             className="btn btn-danger btn-sm float-end">Delete</button>
            <button onClick={()=>{
                updateEmployee(employeeID, firstname, lastname,grade);
            }}
             className="btn btn-info btn-sm float-end me-2">Edit</button>
            
        </div>
    )
}
export default Employee;