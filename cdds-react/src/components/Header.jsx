import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import cggLogo from '../images/cgg_logo.jpg';
export default function Header(){
  return (
    <header className="app-header">
      <Navbar light expand="md" className="w-100">
        <NavbarBrand href="/" className="d-flex align-items-center">
        <img src={cggLogo} alt="logo" style={{width:36,height:36, marginRight:8}}/>
          <span style={{fontWeight:700, color:'#fff'}}>Centre for Good Governance</span>
        </NavbarBrand>
        <Nav className="ms-auto" navbar>
          {/* <NavItem>
            <NavLink href="#" style={{color:'#fff'}}>Profile</NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink href="#" style={{color:'#fff'}}>Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </header>
  );
}
