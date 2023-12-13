// function Employee({ firstname, lastname, deleteEmployee, updateEmployee, employeeID, email, phoneNumber, address, department }) {
//     return (
//       <div className="alert alert-light bg-dark-subtle shadow-lg">
//         {lastname}, {firstname}, {email}, {phoneNumber}, {address}, {department}
//         <button
//           onClick={() => {
//             deleteEmployee(employeeID, firstname, lastname);
//           }}
//           className="btn btn-danger btn-sm float-end"
//         >
//           Delete
//         </button>
//         <button
//           onClick={() => {
//             updateEmployee(
//               employeeID,
//               firstname,
//               lastname,
//               email,
//               phoneNumber,
//               address,
//               department
//             );
//           }}
//           className="btn btn-info btn-sm float-end me-2"
//           data-bs-toggle="modal"
//           data-bs-target="#exampleModal"
//         >
//           Edit
//         </button>
//       </div>
//     );
//   }
//   export default Employee;



  function Employee({ firstname, lastname, email, phoneNumber, address, department, deleteEmployee, updateEmployee, employeeID }) {
  return (
    <div className="card mt-5 mb-3">
      <div className="card-header">
        Employee Details
      </div>
      <div className="card-body">
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">First Name</th>
              <td>{firstname}</td>
            </tr>
            <tr>
              <th scope="row">Last Name</th>
              <td>{lastname}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th scope="row">Phone Number</th>
              <td>{phoneNumber}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{address}</td>
            </tr>
            <tr>
              <th scope="row">Department</th>
              <td>{department}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger me-2" onClick={() => deleteEmployee(employeeID, firstname, lastname)}>Delete</button>
          <button className="btn btn-info" onClick={() => updateEmployee(employeeID, firstname, lastname, email, phoneNumber, address, department)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Employee;

  