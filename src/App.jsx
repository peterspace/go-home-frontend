import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

//============{Desktop}===============================
import Layout from './Layout';
import Exchange from './components/Frame/Exchange';
//============{Components}===============================
import DBalanceNetwork from './pages/DBalanceNetwork';
import DSwap from './pages/DSwap';
import Swap from './components/Frame/Swap';

// import Dex from './uiComponents/AppPage/Dex';
import Dex from './uiComponents/AppPage/Dex';

//============{Window size}===============================
import useWindowResize from './hooks/useWindowResize';
import GovercityDesktop from './pages/GovercityDesktop';

//======{NEW UI}===============================
import ScreenDesktopApp14401 from './pages/ScreenDesktopApp14401';

//============{CHAT APP}=================
// import Chatpage from './components/chat/Chatpage';
// import Homepage from './components/chat/Homepage';
import ChatGroup from './pages/chat/pages/ChatGroup';

import ProfileEdit from './pages/chat/pages/ProfileEdit';
import ProfileView from './pages/chat/pages/ProfileView';
import ChateMessage from './pages/chat/pages/ChateMessage';
import ChatHome from './pages/chat/pages/ChatHome';
import Signup from './pages/chat/pages/Signup';
import Login from './pages/chat/pages/Login';
import FormContainer from './pages/chat/components/FormContainer';
import RegisterAdmin from './pages/chat/pages/RegisterAdmin';
// import Homepage from './pages/chat/Homepage';

function App() {
  const { width, height } = useWindowResize();
  console.log(width, height);

  // return <div className="App">{width > 450 ? "DESKTOP" : "MOBILE"}</div>;

  // const isMobile = window.innerWidth <= 500;
  // const isMobile = window.innerWidth <= 375;
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ScreenDesktopApp14401 />} />
          <Route exact path="/app" element={<ScreenDesktopApp14401 />} />
          <Route exact path="/home" element={<GovercityDesktop />} />
          <Route path="/swap" element={<Swap />} />
          <Route exact path="/exchange" element={<Exchange />} />
          <Route path="/dbalancenetwork" element={<DBalanceNetwork />} />
          <Route path="/dswap" element={<DSwap />} />
          <Route path="dex" element={<Dex />} />
          {/* =================={Chat Section}============================== */}
        </Route>
        <Route path="/chatgroup" element={<ChatGroup />} />
        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route path="/chatemessage" element={<ChateMessage />} />
        <Route path="/chathome" element={<ChatHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="/profile" element={<FormContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
