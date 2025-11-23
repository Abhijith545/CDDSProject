// import React from 'react';
// import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import cggLogo from '../images/cgg_logo.jpg';
// export default function Header(){
//   return (
//     <header className="app-header">
//       <Navbar light expand="md" className="w-100">
//         <NavbarBrand href="/" className="d-flex align-items-center">
//         <img src={cggLogo} alt="logo" style={{width:36,height:36, marginRight:8}}/>
//           <span style={{fontWeight:700, color:'#fff'}}>Centre for Good Governance</span>
//         </NavbarBrand>
//         <Nav className="ms-auto" navbar>
//           {/* <NavItem>
//             <NavLink href="#" style={{color:'#fff'}}>Profile</NavLink>
//           </NavItem> */}
//           <NavItem>
//             <NavLink href="#" style={{color:'#fff'}}>Logout</NavLink>
//           </NavItem>
//         </Nav>
//       </Navbar>
//     </header>
//   );
// }

import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cggLogo from '../images/cgg_logo.jpg';

export default function Header(){
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); 
    localStorage.removeItem('auth');
    console.log('auth removed from localStorage:', localStorage.getItem('auth'));
    toast.success('Logged out');
    // navigate to login
    navigate('/login');
  };

  return (
    <header className="app-header">
      <Navbar light expand="md" className="w-100">
        <NavbarBrand href="/" className="d-flex align-items-center">
          <img src={cggLogo} alt="logo" style={{width:36,height:36, marginRight:8}}/>
          <span style={{fontWeight:700, color:'#fff'}}>Centre for Good Governance</span>
        </NavbarBrand>
        <Nav className="ms-auto" navbar>
          <NavItem>
            {/* use onClick to logout; keep href="#" but preventDefault in handler */}
            <NavLink href="#" style={{color:'#fff'}} onClick={handleLogout}>Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </header>
  );
}
