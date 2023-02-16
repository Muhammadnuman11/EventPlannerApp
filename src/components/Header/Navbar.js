import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../pages/Context/AuthContext";

export default function Navbar() {

    const { authentication, dispatch } = useContext(AuthContext)
    const { isAuthentication } = authentication
    console.log(isAuthentication)

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "LOGOUT" })
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand fs-2">🚖 Parking</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page"  >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link"  >About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link"  >Contact</Link>
                            </li>
                        </ul>
                        <div className="d-flex">

                            {!isAuthentication ?
                                <>
                                    <button className="btn btn-info btn-sm mx-2 text-light">
                                        <Link to="auth/login" className="nav-link">Login</Link></button>
                                </>
                                : <>
                                    <button className="btn btn-info btn-sm mx-2 text-light">
                                        <Link to="/dashboard" className="nav-link">Dashboard</Link></button>
                                    <button className="btn btn-danger btn-sm mx-2 text-light" onClick={handleLogout}>Logout</button>
                                </>
                            }

                            {/* <button className="btn btn-info btn-sm mx-2 text-light">
                                <Link to="auth/register" className="nav-link">Register</Link></button>
                            <button className="btn btn-info btn-sm mx-2 text-light">
                                <Link to="auth/forgotpassword" className="nav-link">Forgot Password</Link></button> */}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}