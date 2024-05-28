import React from 'react';
import {Image, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import logo from '../images/tangerine.png';
import useStore from "../stores/store";

function Navigation() {

    const {user, setUser} = useStore();

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <Navbar bg="primary" expand="lg">
            <div className="container-fluid px-4">
                <NavLink to="/" exact="true" className="nav-link"><Image src={logo} alt="Bank Eh!" height="50px"/></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/" exact="true" className="nav-link">Home</NavLink>
                        {user && <NavLink to="/deposit" className="nav-link">Deposit</NavLink>}
                        {user && <NavLink to="/withdrawal" className="nav-link">Withdrawal</NavLink>}
                        {user ?
                            <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink> :
                            <>
                                <NavLink to="/signup" className="nav-link">Signup</NavLink>
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default Navigation;