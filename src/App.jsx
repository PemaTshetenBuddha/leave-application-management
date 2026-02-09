
import{Routes,Route} from 'react-router-dom'
import Login from './page/Login';
import SignUp from './page/signUp';
import Application from './page/Application';
import Navbar from './components/Navbar';
import Admins from './page/AdminDashBoard';
import Tables from './components/Table';
import UserProfilePage from './page/UserProfile';
import userTable from './page/UserTable';
import EmployeeDetail from './components/EmployeeDetail';
import HightLight from './components/HightLight';
import AdminsD from './page/AdminDashBoard';
import ForgotPassword from './page/ForgotPassword';
import ResetPassword from './page/ResetPassword';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Login />} /> 
      <Route path='login' element={<Login/>}></Route>
      <Route path='signup' element={<SignUp/>}></Route>
      <Route path='forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='reset/:token' element={<ResetPassword/>}></Route>
      <Route path='Application' element={<Application/>}></Route>
      <Route path='Admins' element={<Admins/>}></Route>
      <Route path='userProfile' element={<UserProfilePage/> }></Route>
      <Route path='userTable' element={<userTable/> }></Route>
    </Routes>
  )
}
export default App
 