import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleClickSignIn = () => {
    if (validate()) {
      const user = {
        email: email.trim(),
        password: password.trim(),
      };
      signIn(user);
    }
  };
  const signIn = async (user) => {
    try {
      const res = await axios.post("http://localhost:8080/auth/token", user);
      const token = res.data.result.token;
      localStorage.setItem("token", token);

      // Decode token
      const decodedToken = jwtDecode(token)
      const role = decodedToken.scope;
      if(role === "ADMIN") {
        navigate('/dashboard');
      toast.success('Đăng nhập thành công! Chào mừng Admin.', {
        position: 'top-right',
        autoClose: 3000
      });
      } else {
        navigate('/');
        toast.success('Đăng nhập thành công!', {
          position: 'top-right',
          autoClose: 3000
        });
      }
      
    } catch (error) {
      toast.error("Đăng nhập thất bại!", {
        position: "top-right",
        autoClose: 3000, // 3 giây
      });
      console.log(error);
      const newErrors = {
        email: "",
        password: "",
      };
      if (error.response.data.code === 1004) {
        newErrors.email = "Email đã tồn tại";
      }
      if (error.response.data.code === 1005) {
        newErrors.password = "Nhập sai mật khẩu!";
      }
      setErrors(newErrors);
    }
  };
  const validate = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Kiểm tra các trường không được bỏ trống
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      // Kiểm tra định dạng email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
        isValid = false;
      }
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <MDBContainer
      fluid
      className="p-5 background-radial-gradient overflow-hidden"
      style={{ overflow: "hidden" }}
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            Luxry <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>Vista Resort</span>
          </h1>
          <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
            Welcome back! Please sign in to continue managing your bookings.
          </p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5">
              <MDBInput
                onChange={handleChangeEmail}
                wrapperClass="mb-4"
                label="Email or Phone Number"
                id="form1"
                type="text"
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
              <MDBInput
                onChange={handleChangePassword}
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
              />
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember password"
                />
              </div>
              <MDBBtn
                onClick={handleClickSignIn}
                className="w-100 mb-4"
                size="md"
              >
                Sign In
              </MDBBtn>
              <div className="text-center">
                <p>or sign in with:</p>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
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
