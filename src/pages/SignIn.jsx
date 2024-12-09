import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
} from 'mdb-react-ui-kit';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const demoUser = {
    email: 'abc',
    password: '123',
    username: 'User'
  };

  const handleSignIn = () => {
    console.log('Signing in...');
    if (email === demoUser.email && password === demoUser.password) {
      setError('');
      navigate('/booking');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };
  return (
    <MDBContainer fluid className='p-5 background-radial-gradient overflow-hidden' style={{ overflow: 'hidden' }}>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Luxry <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>Vista Resort</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            Welcome back! Please sign in to continue managing your bookings.
          </p>
        </MDBCol>

        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBInput 
                wrapperClass='mb-4' 
                label='Email or Phone Number' 
                id='form1' 
                type='text' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <MDBInput 
                wrapperClass='mb-4' 
                label='Password' 
                id='form2' 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember password' />
              </div>
              <MDBBtn className='w-100 mb-4' size='md' onClick={handleSignIn}>Sign In</MDBBtn>
              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Hiển thị thông báo lỗi */}
              <div className="text-center">
                <p>or sign in with:</p>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignIn;
