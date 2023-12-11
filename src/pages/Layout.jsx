import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function Layout(){

    const [authenticated, setAuthenticated] = useState(false);
    let navigate = useNavigate();

    useEffect(()=>{
        // gonna check if may naka signed in
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          setAuthenticated(true);
        //   alert("sign in")
          // ...
        } else {
          // User is signed out
        //   alert("not log in")
          // ...
        }
      });     
    }, [])


    //logout function
    const logout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth).then(() => {
            // alert("sign out success")
            navigate("/login");
            setAuthenticated(false)
            // navigate("/login");
        }).catch((error) => {
        // An error happened.
        });
    }

    return(       
        <main className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg bg-dark-subtle">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">Home</Link>
                    <button className="navbar-toggler bg-light-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-item nav-link" to="Services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="contact">Contact</Link>
                        </li>

                        </ul>
                       

                        
                        <ul className="navbar-nav ms-auto">
                        {
                            authenticated
                            ?
                            <li className="nav-item">
                                <Link className="nav-link" to="register" onClick={logout}>Logout</Link>
                            </li>
                            :
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to="login">login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="register">Register</Link>
                            </li>
                            </>

                        }
                        </ul>
                        
                    
                    </div>
                </div>
            </nav>
            <div className="container p-3">

            </div>
            <Outlet></Outlet>
            <footer className="text-center mt-auto bg-dark-subtle pt-3">
                <p>Copyright©️ All Right Reserve, Mark S. Santos</p>
            </footer>
            </main>
    )
}