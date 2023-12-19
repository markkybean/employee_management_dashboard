  function Employee({ firstname, lastname, email, phoneNumber, address, department, deleteEmployee, updateEmployee, employeeID, handleViewMore}) {
    return (
      <div className="alert alert-light bg-dark-subtle shadow-lg">
        <div className="row">
          <div className="col-3">
            {lastname}, {firstname}
          </div>
          <div className="col-3">{department}</div>
          <div className="col-4"></div>
          <div className="col-2">
            {/* <button type="button" className="btn btn-dark float-end " data-bs-toggle="modal" data-bs-target="#employeeDetails">
              View More
            </button> */}

            <button
              type="button"
              className="btn btn-dark float-end"
              onClick={() => handleViewMore(employeeID)}
              data-bs-toggle="modal"
              data-bs-target={`#employeeDetails-${employeeID}`}
            >
              View More
            </button>

            {/* Modal */}
            <div
              className="modal fade"
              id={`employeeDetails-${employeeID}`}
              tabIndex="-1"
              aria-labelledby={`employeeDetailsLabel-${employeeID}`}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable  modal-dialog-centered modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Employee Details
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-5 p-5 border mt-5 shadow-md">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table">
                            <tbody className="row m-2 border p-2 shadow">
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">First Name</th>
                                <td className="col-md-6 col-sm-12">{firstname}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Last Name</th>
                                <td className="col-md-6 col-sm-12">{lastname}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Email</th>
                                <td className="col-md-6 col-sm-12">{email}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Phone Number</th>
                                <td className="col-md-6 col-sm-12">{phoneNumber}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Address</th>
                                <td className="col-md-6 col-sm-12">{address}</td>
                              </tr>
                              <tr className="row">
                                <th className="col-md-6 col-sm-12" scope="row">Department</th>
                                <td className="col-md-6 col-sm-12">{department}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    {/* Buttons */}
                    <div className="col-md-2 col-lg-2 col-sm-12">
                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-danger me-2"
                          onClick={() =>
                            deleteEmployee(employeeID, firstname, lastname)
                          }
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-info"
                          onClick={() =>
                            updateEmployee(
                              employeeID,
                              firstname,
                              lastname,
                              email,
                              phoneNumber,
                              address,
                              department
                            )
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Edit
                        </button>
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