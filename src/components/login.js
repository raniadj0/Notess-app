import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase sign-in method
import { Link, useNavigate } from 'react-router-dom'; // React Router for navigation
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon
} from 'mdb-react-ui-kit'; // MDBootstrap UI components
import './login.css'; // Custom styles for the login component

// Login component for user authentication
const Login = () => {
  const [email, setEmail] = useState(''); // State for storing email input
  const [password, setPassword] = useState(''); // State for storing password input
  const [error, setError] = useState(''); // State to store error messages
  const navigate = useNavigate(); // React Router hook for navigation

  // Redirect user to home if already authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/'); // Redirect to home page if user is authenticated
      }
    });

    return unsubscribe; 
  }, [navigate]);

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await signInWithEmailAndPassword(auth, email, password); // Attempt to sign in with email and password
    } catch (err) {
      setError(err.message); // Set error message if sign-in fails
    }
  };

  return (
    <MDBContainer fluid className="login-background"> {/* Background styling for login */}
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login to Notess</h2> {/* Login title */}
              <p className="text-white-50 mb-5">Please enter your email and password!</p>

              {/* Login form */}
              <form onSubmit={handleLogin} style={{ width: '100%' }}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  labelClass='text-white'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on input change
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
                  onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                  required
                />

                {error && <p className="error-message">{error}</p>} {/* Display error message if login fails */}

                <div className="text-center">
                  <MDBBtn className='no-hover' color='light' size='lg' type="submit"> {/* Login button */}
                    Login
                  </MDBBtn>
                </div>
              </form>

              {/*  login buttons */}
              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3 no-hover' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3 no-hover' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3 no-hover' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>

              {/* Link to signup page */}
              <div>
                <p className="mb-0">Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;







