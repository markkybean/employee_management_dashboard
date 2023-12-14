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



  function Employee({ firstname, lastname, email, phoneNumber, address, department, deleteEmployee, updateEmployee, employeeID, handleViewMore}) {
    return (
      <div className="alert alert-light bg-dark-subtle shadow-lg">
        <div className="row">
          <div className="col-3">
            {lastname}, {firstname}
          </div>
          <div className="col-3">
            {department}
          </div>
          <div className="col-4">

          </div>
          <div className="col-2">
            {/* <button type="button" className="btn btn-dark float-end " data-bs-toggle="modal" data-bs-target="#employeeDetails">
              View More
            </button> */}

            <button
              type="button"
              className="btn btn-dark float-end"
              onClick={() => handleViewMore(employeeID)}
              data-bs-toggle="modal"
              data-bs-target="#employeeDetails"
            >
              View More
            </button>


            {/* Modal */}
            <div className="modal fade" id="employeeDetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Employee Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-5 p-5 border mt-5 shadow-lg">
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

                      </div>

                    </div>
                  </div>
                  <div className="modal-footer">
                              {/* Buttons */}
                              <div className="col-md-2 col-lg-2 col-sm-12">
                                <div className="d-flex justify-content-end">
                                  <button className="btn btn-danger me-2" onClick={() => deleteEmployee(employeeID, firstname, lastname)}>Delete</button>
                                  <button className="btn btn-info" onClick={() => updateEmployee(employeeID, firstname, lastname, email, phoneNumber, address, department)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                </div>

                              </div>
                            </div>
                </div>
              </div>
            </div>
            {/* end of modal */}
          </div>
        </div>
      </div>







    );
  }

  export default Employee;

