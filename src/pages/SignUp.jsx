
import React, { useState } from 'react';
import { toast } from 'react-toastify';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleSignup = () => {
    if (validate()) {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const user = {
        fullName: fullName,
        email: email.trim(),
        password: password.trim()
      }
      signUp(user)
    } 
   
  }

  const signUp = async (user) => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/create_user', user);
      console.log(res.data)
      toast.success('Đăng ký thành công!', {
        position: 'top-right',
        autoClose: 3000 // 3 giây
      });

      // Điều hướng sang trang đăng nhập sau 3 giây
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error) {
      console.log(error)
      const newErrors = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      };
      if(error.response.data.code === 1002) {
        newErrors.email = "Email đã tồn tại!!";
      }
      setErrors(newErrors);

      // Hiển thị toast lỗi
      toast.error('Đăng ký thất bại!', {
        position: 'top-right',
        autoClose: 3000 // 3 giây
      });
    }
  }

  
  const validate = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  
    // Kiểm tra các trường không được bỏ trống
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else {
      // Kiểm tra định dạng email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email format';
        isValid = false;
      }
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value)
    
  }
  const handleChangeLastName = (e) => {
    setLastName(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  return (
    <MDBContainer fluid className='p-5 background-radial-gradient overflow-hidden' style={{ overflow: 'hidden' }}>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Luxry <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>Vista Resort</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
          Our website is specially designed to provide the perfect hotel management experience for upscale resorts. 
          With a user-friendly interface, you can easily manage bookings, track room availability, and oversee customer interactions,
           all while enhancing your guest services. Our system integrates advanced technology to streamline operations 
           and elevate the customer experience. At Luxury Resort Management, you will discover how to turn every stay into an unforgettable experience for your guests.
          </p>
        </MDBCol>

        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput onChange={handleChangeFirstName} wrapperClass='mb-4' label='First name' id='form1' type='text' />
                  {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput onChange={handleChangeLastName} wrapperClass='mb-4' label='Last name' id='form2' type='text' />
                  {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                </MDBCol>
              </MDBRow>
              <MDBInput onChange={handleChangeEmail} wrapperClass='mb-4' label='Email' id='form3' type='email' />
              {errors.email && <p className="text-danger">{errors.email}</p>}
              <MDBInput onChange={handleChangePassword} wrapperClass='mb-4' label='Password' id='form4' type='password' />
              {errors.password && <p className="text-danger">{errors.password}</p>}
              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember password' />
              </div>
              <MDBBtn onClick={handleSignup} className='w-100 mb-4' size='md'>Sign Up</MDBBtn>
              <div className="text-center">
                <p>or sign up with:</p>
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

export default Signup;
