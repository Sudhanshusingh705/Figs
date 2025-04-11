import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { FaUser, FaBell, FaEnvelope } from 'react-icons/fa';
import '../../styles/admin.css';

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/admin">
            Admin Panel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link href="#" className="position-relative me-3">
                <FaBell className="fs-5" />
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-circle">
                  3
                </Badge>
              </Nav.Link>
              <Nav.Link href="#" className="position-relative me-3">
                <FaEnvelope className="fs-5" />
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-circle">
                  7
                </Badge>
              </Nav.Link>
              <NavDropdown 
                title={
                  <span className="d-inline-flex align-items-center">
                    <FaUser className="me-1" />
                    Admin
                  </span>
                } 
                id="admin-nav-dropdown"
              >
                <NavDropdown.Item href="/admin/profile">
                  <FaUser className="me-2" />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/settings">
                  <i className="fas fa-cog me-2"></i>
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout" className="text-danger">
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader; 