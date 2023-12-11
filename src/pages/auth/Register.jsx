import{Link, useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,updateProfile, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useState,useEffect } from 'react';

export default function Register(){


    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] =useState('');
    const navigate = useNavigate();

    // const handleRegistration = () => {

    //   if(firstname!=='' && lastname!=='' && email!=='' && password!=='' && password!=='' && password==confirmPassword){
    //     const auth = getAuth(firebaseApp);
    //     createUserWithEmailAndPassword(auth, email, password)
    //       .then((userCredential) => {
    //         // Signed up 
    //         const user = userCredential.user;
    //         updateProfile(auth.currentUser, {
    //           displayName: firstname + " " + lastname
    //         });
    //         // alert("Registration Successful!");
    //         navigate("/");
    //         // ...
    //       })
    //       .catch((error) => {
    //         alert("Registration failed!");
    //         // ..
    //       });
    //   }else{
    //     alert("incorect or missing credentials")
    //   }  
    // }


    const handleRegistration = () => {
      if (firstname !== '' && lastname !== '' && email !== '' && password !== '' && password === confirmPassword) {
          const auth = getAuth(firebaseApp);
          createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed up 
                  // This listener will handle the update of display name
                  // when the user is successfully created
              })
              .catch((error) => {
                  alert("Registration failed!");
              });
      } else {
          alert("Incorrect or missing credentials");
      }
  }

  useEffect(() => {
      const auth = getAuth(firebaseApp);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              // User is signed in, update profile
              updateProfile(user, {
                  displayName: firstname + " " + lastname
              }).then(() => {
                  // Update successful
                  navigate("/");
              }).catch((error) => {
                  // Update failed
                  alert("Registration failed!");
              });
          }
      });

      return () => unsubscribe(); // Cleanup the listener on unmount
  }, [firstname, lastname, navigate]);

    
    return(
        <div className="container border p-5 rounded">
            <h1 className="fw-bold">Registration</h1>
            <p>Create your account here.</p>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="firstname">Firstname</label>
                <input id="firstname" type="text"  className="form-control" onChange={(e)=>setFirstname(e.target.value)} value={firstname} />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastname">Lastname</label>
                <input id="lastname" type="text"  className="form-control" onChange={(e)=>setLastname(e.target.value)} value={lastname} />
              </div>
            </div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email"  className="form-control" onChange={(e)=>setEmail(e.target.value)} value={email} />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} value={password}  />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" className="form-control" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}  />
            <button className="btn btn-success mt-3" onClick={()=>handleRegistration()}>Register</button>
            <hr />
            <Link to="/Login">Already have an account? Login here.</Link>

        </div>
    )
};