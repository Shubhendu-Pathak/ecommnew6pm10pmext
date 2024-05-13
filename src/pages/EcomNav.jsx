import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import navstyle from './EcomNav.module.css'
import { useAuth } from '../context-data';

function EcomNav() {

// context DATA
let {data,setdata,logout} = useAuth()
// console.log(data);

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
        
{
  !data?.isLoggedIn ?   <NavLink  to="/">Login</NavLink> : ''
}

{
  !data?.isLoggedIn ?   <NavLink  to="/register">Register</NavLink> : ''
}

{
  !!data?.isLoggedIn ?    <NavLink  to="/dashboard">Dashboard</NavLink> : ''
}

{
  !!data?.isLoggedIn ?      <NavLink  to="/Store">Store</NavLink> : ''
}

{
  data?.isLoggedIn ?      
(
  <NavDropdown title={`${data?.currentUserName}`} id="basic-nav-dropdown"  className={`${navstyle.navdrop}`}>
  <NavDropdown.Item>
   <button className='btn btn-outline-danger ' onClick={()=>logout()}>LOGOUT</button>
  </NavDropdown.Item>
</NavDropdown> 
)
: 
''
}      
      
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default EcomNav