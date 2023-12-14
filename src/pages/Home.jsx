import Employee from "./Employee";
import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home(){
  const [employee, setEmployee] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    address: '',
    department: '',
  });
  

    const [employeeList, setEmployeeList] = useState([]);

    const [authenticated, setAuthenticated] = useState(false);

    const [editToggle, setEditToggle] = useState(false);

    const [userProperties, setUserProperties] = useState({});

    const db = getFirestore(firebaseApp);

    useEffect(() =>{


        // initialize cloud firestore and get a reference to the service

        

        try{
            
            onSnapshot(collection(db, 'employees'), snapshot => {


                const newEmployeeList = [];

                snapshot.forEach(employee => {
                    const tempEmployee = employee.data();
                    tempEmployee["employee_id"]=employee.id;
                    newEmployeeList.push(tempEmployee);
                });
                setEmployeeList(newEmployeeList);
            });

        }catch(e){
            alert("error", error)
        }

        // will check if the user is login
        const auth = getAuth(firebaseApp);
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setAuthenticated(true)
              console.log(user.providerData);
              setUserProperties(user);
            } else {
              // User is signed out
              // ...
            }
          });
        
    }, [])

    


    // create 
    const addEmployee = () => {
      // Initialize cloud firestore and get a reference to the service    
      // Check for missing required fields
      if (
        employee.firstname === '' ||
        employee.lastname === '' ||
        employee.email === '' ||
        employee.phoneNumber === '' ||
        employee.address === '' ||
        employee.department === ''
        // Add other required fields as needed
      ) {
        alert("Missing Fields");
      } else {
        // Update local state
        setEmployeeList([...employeeList, employee]);
    
        // Add employee to Firestore
        addDoc(collection(db, 'employees'), employee)
          .then(() => {
            console.log("Employee added to Firestore");
          })
          .catch((error) => {
            console.error("Error adding employee to Firestore: ", error);
            // Handle error if addition fails
          });
    
        // Clear form fields
        setEmployee({
          firstname: '',
          lastname: '',
          email: '',
          phoneNumber: '',
          address: '',
          department: '',
          // Add other fields as needed
        });

      }
    };
    

    // delete function

    const deleteEmployee = (employeeID, firstname, lastname) => {
      const confirmation = window.confirm(`Are you sure you want to delete ${firstname} ${lastname}?`);
      if (confirmation) {
        deleteDoc(doc(db, "employees", employeeID))
          .then(() => {
            console.log(`${firstname} ${lastname} deleted successfully`);
          })
          .catch((error) => {
            console.error("Error deleting employee: ", error);
            // Handle error if deletion fails
          });
      }
    };


    // update employee/ edit

    const updateEmployee = (employeeID, firstname, lastname, email, phoneNumber, address, department) => {
      setEditToggle(true);
      setEmployee({
        employeeID: employeeID,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        department: department,
        // Add other fields as needed
      });
    };
    

  const handleEmployeeUpdate = () => {
    const employeeRef = doc(db, "employees", employee.employeeID);

    updateDoc(employeeRef, {
      firstname: employee.firstname,
      lastname: employee.lastname,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      address: employee.address,
      department: employee.department,
      // Add other fields as needed
    }).then(() => {
      setEditToggle(false);
      setEmployee({
        // Clear all fields after update
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        address: '',
        department: '',
      });
    }).catch((error) => {
      // Handle error if update fails
      console.error("Error updating document: ", error);
    });
  };
    

    if(authenticated){
      return (
        <section className="container" style={{ background: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>
          <h1 className="fw-bold text-center"></h1>
          <h3 className="fw-bold">Hello, {userProperties.displayName} </h3>
          <p>This is the list of employee records.</p>

          
          
            {/* Button trigger modal */}
            <button type="button" className="btn btn-dark mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Add employee
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Employee Information</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body mt-5">
                  <div className="mb-5 p-5 border shadow-lg" style={{ background: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>
                  <div className="row">
                    <div className="col-md-5 col-lg-5 col-sm-12">
                      <label htmlFor="firstname">First name:</label>
                      <input
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            firstname: e.target.value,
                          })
                        }
                        value={employee.firstname}
                        type="text"
                        className="form-control"
                        id="firstname"
                      />
                    </div>
                    <div className="col-md-4 col-lg-5 col-sm-12">
                      <label htmlFor="lastname">Last name:</label>
                      <input
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            lastname: e.target.value,
                          })
                        }
                        value={employee.lastname}
                        type="text"
                        className="form-control"
                        id="lastname"
                      />
                    </div>
                    <div className="col-md-4 col-lg-5 col-sm-12">
                      <label htmlFor="email">Email:</label>
                      <input
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            email: e.target.value,
                          })
                        }
                        value={employee.email}
                        type="text"
                        className="form-control"
                        id="email"
                      />
                    </div>
                    <div className="col-md-4 col-lg-5 col-sm-12">
                      <label htmlFor="phoneNumber">Phone Number:</label>
                      <input
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            phoneNumber: e.target.value,
                          })
                        }
                        value={employee.phoneNumber}
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                      />
                    </div>
                    <div className="col-md-4 col-lg-5 col-sm-12">
                      <label htmlFor="address">Address:</label>
                      <input
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            address: e.target.value,
                          })
                        }
                        value={employee.address}
                        type="text"
                        className="form-control"
                        id="address"
                      />
                    </div>
                    <div className="col-md-4 col-lg-5 col-sm-12">
                      <label htmlFor="department">Department/Team:</label>
                      <input
                        onChange={(e) =>
                          setEmployee({
                            ...employee,
                            department: e.target.value,
                          })
                        }
                        value={employee.department}
                        type="text"
                        className="form-control"
                        id="department"
                      />
                    </div>



                    {/* Display current employee details */}
                    {/* <div className="alert alert-light mt-3">
                <h3 className="fw-bold">
                  {employee.firstname} {employee.lastname}{" "}
                </h3>
              </div> */}
                  </div>
                  </div>
                  
                  </div>
                  <div className="modal-footer">
                    {/* Buttons */}
                    <div className="col-md-2 col-lg-2 col-sm-12">
                      {editToggle ? (
                        <button
                          onClick={handleEmployeeUpdate}
                          className="btn btn-success mt-4 float-end"
                          data-bs-dismiss="modal"
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          onClick={addEmployee}
                          className="btn btn-dark mt-4 float-end"
                          type="button"
                          data-bs-dismiss="modal"
                        >
                          Add➕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            

  
  
          {/* kapag 0 lalabas no employee */}
          {employeeList.length === 0 
          
          ? 
          
          (
            <div className="alert alert-info mt-3 shadow">
              As of right now, no employee records exist.
            </div>
          ) 
          
          : 
          
          (
            <>
                <div className="row ms-1 border shadow m-auto mb-3">
                  <div className="col-3">
                    <h3>Name</h3>
                  </div>
                  <div className="col-3">
                    <h3>Department</h3>
                  </div>
                </div>
          
              {employeeList.map((employeeRecord) => (
                
                  <Employee
                key={employeeRecord.employee_id}
                firstname={employeeRecord.firstname}
                lastname={employeeRecord.lastname}
                email={employeeRecord.email}
                phoneNumber={employeeRecord.phoneNumber}
                address={employeeRecord.address}
                department={employeeRecord.department}
                deleteEmployee={deleteEmployee}
                updateEmployee={updateEmployee}
                employeeID={employeeRecord.employee_id}
              />

               
                
              
              ))}

   
            </>
          )}
        </section>
      )

    }else {
      return (
        <section>
            <h1>Welcome guest!</h1>
        </section>
      )
    }
   
}