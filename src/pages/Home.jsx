import Employee from "./Employee";
import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home(){
    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        grade: '',
    });

    const [employeeList, setEmployeeList] = useState([]);

    const [authenticated, setAuthenticated] = useState(false);

    const [editToggle, setEditToggle] = useState(false);

    const [userProperties, setUserProperties] = useState({});

    useEffect(() =>{


        // initialize cloud firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

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
            alert("error")
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
    const addEmployee = () =>{
        // initialize cloud firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

        if(employee.firstname=== '' || employee.lastname==='' || employee.grade===''){
            alert("Missing Fields")

        }else{
            setEmployeeList(
                employeelist => [
                    ...employeeList, employee
                ]
            );

            addDoc(collection(db, 'employees'), employee);
                
            setEmployee({
                // remove yung nakalagay sa form na sulat
                firstname: '',
                lastname: '',
                grade: '',
            });

            
            // localStorage.setItem('employeeList', JSON.stringify(employeeList));  
        }
        
    }

    // delete function

    const deleteEmployee = (employeeID, firstname, lastname) => {

        // initialize cloud firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

        confirm(`Are you sure you want to delete ${firstname} ${lastname}?`).then(
            deleteDoc(doc(db, "employees", employeeID))
       );
    
    }


    // update employee/ edit

    const updateEmployee = (employeeID, firstname, lastname, grade) => {
        setEditToggle(true);
        setEmployee({
            employeeID: employeeID,
            firstname: firstname,
            lastname: lastname,
            grade: grade
        });
    }

    const handleEmployeeUpdate = () => {
        const db = getFirestore(firebaseApp);

        const employeeRef = doc(db, "employees", employee.employeeID);

        updateDoc(employeeRef, {
            firstname: employee.firstname,
            lastname: employee.lastname,
            grade: employee.grade
        });

        setEditToggle(false);
        setEmployee({
            // remove yung nakalagay sa form na sulat
            firstname: '',
            lastname: '',
            grade: '',
        });
    }

    if(authenticated){
      return (
        <section className="container">
          <h1 className="fw-bold">🎓Employee Record🎓</h1>
          <h3 className="fw-bold">Hello, {userProperties.displayName} </h3>
          <p>This is the list of employee records.</p>
          <div className="mb-5 p-5 border bg-dark-subtle shadow-lg">
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
              <div className="col-md-2 col-lg-1 col-sm-2 pe-1">
                <label htmlFor="grade">Grade:</label>
                <input
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      grade: e.target.value,
                    })
                  }
                  value={employee.grade}
                  type="number"
                  className="form-control"
                  id="grade"
                />
              </div>
  
              {editToggle ? (
                // kung true magiging update, pag cinlick yung edit
                <div className="col-md-2 col-lg-2 col-sm-12">
                  <button
                    onClick={() => {
                      handleEmployeeUpdate();
                    }}
                    className="btn btn-success mt-4"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div className="col-md-2 col-lg-2 col-sm-12">
                  <button
                    onClick={() => {
                      addEmployee();
                    }}
                    className="btn btn-dark mt-4"
                  >
                    Add➕
                  </button>
                </div>
              )}
  
              <div className="alert alert-light mt-3">
                <h3 className="fw-bold">
                  {employee.firstname} {employee.lastname}{" "}
                  <span className="badge bg-dark">{employee.grade}</span>{" "}
                </h3>
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
              {employeeList.map((employeeRecord) => (
                <Employee
                  key={employeeRecord.employee_id}
                  firstname={employeeRecord.firstname}
                  lastname={employeeRecord.lastname}
                  grade={employeeRecord.grade}
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