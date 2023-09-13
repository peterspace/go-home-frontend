import ContainerHeaderDesktop1 from '../components/ContainerHeaderDesktop1';
import styles from './Signup.module.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../../../redux/api/api';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState();

  console.log({ name: name });
  const [email, setEmail] = useState();
  console.log({ email: email });
  const [password, setPassword] = useState();
  console.log({ password: password });
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [regData, setRegData] = useState();
  console.log({ regData: regData });

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password) {
      toast.error('Please Fill all the Feilds');
      setPicLoading(false);
      return;
    }

    const userData = {
      name,
      email,
      password,
      pic,
    };

    try {
      const data = await registerUser(userData);

      if (data) {
        console.log({ userData: data });
        setRegData(data);
        // localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(data));
        setPicLoading(false);
        setRedirect(true);
      }
    } catch (error) {
      toast.error('Registration failed');
      // setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast.error('Please Select an Image!');
      return;
    }
    console.log(pics);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'kxxtmdn1');
      data.append('cloud_name', 'datkh2oxv');
      fetch('https://api.cloudinary.com/v1_1/datkh2oxv/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast.error('Please Select an Image!');
      setPicLoading(false);
      return;
    }
  };

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={styles.signup}>
      <ContainerHeaderDesktop1
        dimensions="/logoframe.svg"
        containerHeaderDesktopPosition="absolute"
        containerHeaderDesktopTop="0px"
        containerHeaderDesktopLeft="-1px"
      />
      <div className={styles.signupChild} />
      <form className="max-w-md mx-auto" onSubmit={submitHandler}>
        <div className={styles.upload5Parent}>
          <div className="flex flex-col gap-3 px-2 py-2">
            <div className={`flex flex-col gap-2 ${styles.username}`}>
              <div className="flex row-row gap-1">
                {/* <img className="" alt="" src="/cursor.svg" /> */}
                <div className={''}>Username</div>
              </div>
              <input
                className={''}
                type="name"
                placeholder="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className={`flex flex-col gap-2 ${styles.eMail}`}>
              <div className="flex row-row gap-1">
                {/* <img className="" alt="" src="/cursor.svg" /> */}
                <span className="">Email</span>
              </div>
              <input
                className={''}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>

            <div className={`flex flex-col gap-2 ${styles.password}`}>
              <div className="flex row-row gap-1">
                {/* <img className="" alt="" src="/cursor.svg" /> */}
                <span className="">Password</span>
              </div>

              <input
                className={''}
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <div className={`mt-3 flex flex-col gap-2 ${styles.upload}`}>
              <label>Upload your Picture</label>
              <input
                type="file"
                // className="flex p-1"
                // className={styles.upload}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </div>

            <Link to={'/login'}>
              <div className={styles.alreadyHaveAn}>
                Already have an account?
              </div>
            </Link>

            <div className={styles.welcome}>Welcome</div>
            <div
              className={styles.createYourAccount}
            >{`Create your account `}</div>
            <div className={styles.login}>{`Login `}</div>
            <div className={styles.frameChild} />
            <button type="submit" className={`text-white ${styles.register}`}>
              Register
            </button>
            {/* <button type="submit" className={`text-white`}>
              Register
            </button> */}
          </div>
        </div>
      </form>
      {/* <div className={styles.upload5Parent}>
        
        <form className="max-w-md mx-auto" onSubmit={submitHandler}>
        <div className="flex flex-col gap-3 px-2 py-2 bg-gray-50">
        <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{' '}
            <Link className="underline text-black" to={'/login'}>
              Login
            </Link>
          </div>
          
          </div>
          
        </form>
      </div> */}
    </div>
  );
};

export default Signup;
