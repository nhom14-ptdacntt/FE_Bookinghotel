import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge,
  MDBRow,
} from 'mdb-react-ui-kit';

function App() {
  const [showNav, setShowNav] = useState(false);
  
  return (
    <MDBContainer fluid>
      <section>
        <MDBNavbar expand='lg' light>
          <MDBContainer fluid>
            <MDBNavbarBrand className='ms-1 ms-lg-3 d-flex align-items-center' href='#'>
              <MDBIcon icon='flask' className='text-primary me-2' />
              <small className='fw-bold'>CodeLab</small>
            </MDBNavbarBrand>

            <MDBNavbarToggler
              aria-controls='navbarSupportedContent'
              aria-label='Toggle navigation'
              onClick={() => setShowNav(!showNav)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showNav}>
              <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href='#'>
                    Dashboard
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink disabled href='#'>
                    Contact
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>

            <div className='d-flex align-items-center me-2 me-lg-3'>
              <form className='d-flex input-group w-auto me-3'>
                <span className='input-group-text border-0' id='search-addon'>
                  <MDBIcon icon='search' />
                </span>
                <input
                  type='search'
                  className='form-control rounded'
                  placeholder='Search'
                  aria-label='Search'
                  aria-describedby='search-addon'
                />
              </form>

              <MDBDropdown>
                <MDBDropdownToggle style={{ cursor: 'pointer' }} tag='a' className='text-reset me-3 hidden-arrow'>
                  <MDBIcon icon='bell' />
                  <MDBBadge pill notification color='danger'>
                    1
                  </MDBBadge>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Some news</MDBDropdownItem>
                  <MDBDropdownItem link>Another news</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>

              <MDBDropdown>
                <MDBDropdownToggle style={{ cursor: 'pointer' }} tag='a' className='text-reset me-3 hidden-arrow'>
                  <img
                    src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
                    className='rounded-circle'
                    height='25'
                    alt='Black and White Portrait of a Man'
                    loading='lazy'
                  />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>My profile</MDBDropdownItem>
                  <MDBDropdownItem link>Settings</MDBDropdownItem>
                  <MDBDropdownItem link>Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </div>
          </MDBContainer>
        </MDBNavbar>
      </section>
    </MDBContainer>
  );
}

export default App;
