function Employee({ firstname, lastname, deleteEmployee, updateEmployee, employeeID, email, phoneNumber, address, department }) {
    return (
      <div className="alert alert-light bg-dark-subtle shadow-lg">
        {lastname}, {firstname}
        <button
          onClick={() => {
            deleteEmployee(employeeID, firstname, lastname);
          }}
          className="btn btn-danger btn-sm float-end"
        >
          Delete
        </button>
        <button
          onClick={() => {
            updateEmployee(
              employeeID,
              firstname,
              lastname,
              email,
              phoneNumber,
              address,
              department
            );
          }}
          className="btn btn-info btn-sm float-end me-2"
        >
          Edit
        </button>
      </div>
    );
  }
  export default Employee;
  