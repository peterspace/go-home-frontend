import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
// import { loginUser, validateEmail } from '../services/apiService';
import { loginUser, validateEmail } from '../../../redux/api/api';
import { toast } from 'react-toastify';

import ContainerHeaderDesktop1 from '../components/ContainerHeaderDesktop1';
import styles from './ChatLogin.module.css';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    if (!email || !password) {
      return toast.error('All fields are required');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      email,
      password,
    };

    try {
      const data = await loginUser(userData);
     
      if (data) {
        console.log({ userData: data });
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(data));
        alert('Login successful');
        setRedirect(true);
      }
    } catch (e) {
      alert('Login failed');
    }
  }

  if (redirect) {
    // return <Navigate to={'/landingPage'} />;
    return <Navigate to={'/chatemessage'} />;
  }
  return (
    <div className={styles.chatLogin}>
      <ContainerHeaderDesktop1
        dimensions="/logoframe.svg"
        containerHeaderDesktopPosition="absolute"
        containerHeaderDesktopTop="0px"
        containerHeaderDesktopLeft="-1px"
      />
      <div className={styles.chatLoginChild} />
      <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
        <div className={styles.shapeWithTextParent}>
          <input
            className={styles.shapeWithText}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <div className={styles.username}>Username</div>

          <input
            className={styles.shapeWithText}
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <div className={styles.password}>Password</div>
          <Link to={'/register'}>
            <div className={styles.dontHaveAn}>Don’t have an account?</div>
          </Link>

          <div className={styles.signIn}>Sign in</div>
          <div
            className={styles.accessYourAccount}
          >{`Access your account `}</div>
          <div className={styles.signupForFree}>{`Signup for free `}</div>
          <div className={styles.frameChild} />
          {/* <b className={styles.login}>Login</b> */}
          <button type="submit" className={styles.login}>
            Login
          </button>
          <img className={styles.primaryIcon} alt="" src="/primary1.svg" />
          <img className={styles.primaryIcon1} alt="" src="/primary2.svg" />
          <img className={styles.deleteUserIcon} alt="" src="/deleteuser.svg" />
        </div>
      </form>
    </div>
  );
};

export default Register;

// name,
//     email,
//     password,
//     pic,
//     country,
//     state,
//     city,
//     walletAddress,
//     businessName,
//     tokens,
//     fiat,
