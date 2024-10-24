import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit'; // MDBootstrap components
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase sign-up method
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import { Link, useNavigate } from 'react-router-dom'; // React Router for navigation
import './Signup.css'; 

// Signup component for new user registration
const Signup = () => {
  const [email, setEmail] = useState(''); // State for storing email input
  const [password, setPassword] = useState(''); // State for storing password input
  const [error, setError] = useState(''); // State to store error messages
  const navigate = useNavigate(); // React Router hook for navigation


  // Handle form submission for signup
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <MDBContainer fluid className="signup-background">
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Sign Up </h2>
              <p className="text-white-50 mb-5">Please enter your email and password to join Notess!</p>

              <form onSubmit={handleSignup} style={{ width: '100%' }}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  labelClass='text-white'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <MDBInput
                  wrapperClass='mb-4 w-100'
                  labelClass='text-white'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {error && <p className="error-message">{error}</p>}

                <div className="text-center"> {/* Center the button */}
                  <MDBBtn className='no-hover' color='light' size='lg' type="submit"> {/* Disable hover */}
                    Sign Up
                  </MDBBtn>
                </div>
              </form>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3 no-hover' style={{ color: 'white' }}>
                  <i className='fab fa-facebook-f' size="lg"></i>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3 no-hover' style={{ color: 'white' }}>
                  <i className='fab fa-twitter' size="lg"></i>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3 no-hover' style={{ color: 'white' }}>
                  <i className='fab fa-google' size="lg"></i>
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Already have an account? <Link to="/login" className="text-white-50 fw-bold">Login</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;




