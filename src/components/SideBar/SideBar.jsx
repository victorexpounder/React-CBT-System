import  './SideBar.scss'
import { AccountBalanceWalletTwoTone, AccountBoxRounded, AccountCircle, Dashboard, Logout } from '@mui/icons-material'
import { Person2Outlined, BookOutlined, ComputerOutlined, BarChart, } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../../contex/UserContext";
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { Skeleton } from '@mui/material'

export const SideBar = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true); // New loading state
  const { currentUser } = useContext(UserContext);
  const userDocRef = doc(db, "users", currentUser.uid);

  useEffect(() => {
    const getUserDoc = async () => {
      const userDoc = await getDoc(userDocRef);
      const data = userDoc.data();
      setUserData(data);
      setLoading(false); // Once the data is fetched, setLoading to false
    };

    getUserDoc();
  }, [userDocRef]);

  return (
    <div className='sideBar'>
        <div className="top">
            <Link to={'/'} style={{textDecoration: 'none'}}>
            <span className="logo">BCBT</span>
            </Link>
        </div>
        <hr />
        <div className="center">
        { loading? 
        (
            userData?.role !== 'Director' && 
            <ul>
                <p className="title">MAIN</p>
                <Link to={''} style={{textDecoration: 'none'}}>
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                </Link>
                <p className="title">TOOLS</p>
                
                
                
                <Link to={''} style={{textDecoration: 'none'}}> 
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                </Link>

                <Link to={''} style={{textDecoration: 'none'}}>
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                </Link>
                
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                <p className="title">ACCOUNT</p>
                <Link to={''} style={{textDecoration: 'none'}}>
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                </Link>

                <Link to={''} style={{textDecoration: 'none'}}>
                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                </Link>
            </ul>
        )
        :
        userData?.role !== 'Director' ?
            (<ul>
                <p className="title">MAIN</p>
                <Link to={'/'} style={{textDecoration: 'none'}}>
                <li>
                    <Dashboard className='icon'/>
                    <span>Dashboard</span>
                </li>
                </Link>
                <p className="title">TOOLS</p>
                
                
                
                <Link to={'/subjects'} style={{textDecoration: 'none'}}>
                <li>
                    <BookOutlined className='icon'/>
                    <span>Subjects</span>
                </li>
                </Link>
                <Link to={'/exams'} style={{textDecoration: 'none'}}>
                <li>
                    <ComputerOutlined className='icon'/>
                    <span>Exams</span>
                </li>
                </Link>
                
                <p className="title">ACCOUNT</p>
                <Link to={'/profile'} style={{textDecoration: 'none'}}>
                <li>
                    <AccountCircle className='icon'/>
                    <span>Profile</span>
                </li>
                </Link>
                <Link to={'/login'} style={{textDecoration: 'none'}}>
                <li>
                    <Logout className='icon'/>
                    <span>LogOut</span>
                </li>
                </Link>
            </ul>)
            :
            (
                <ul>
                <p className="title">MAIN</p>
                <Link to={'/'} style={{textDecoration: 'none'}}>
                <li>
                    <Dashboard className='icon'/>
                    <span>Dashboard</span>
                </li>
                </Link>
                <p className="title">TOOLS</p>
                
                <Link to={'/teachers'} style={{textDecoration: 'none'}}>
                <li>
                    <Person2Outlined className='icon'/>

                    <span>Teachers</span>
                </li>
                </Link>
                
                <Link to={'/subjects'} style={{textDecoration: 'none'}}>
                <li>
                    <BookOutlined className='icon'/>
                    <span>Subjects</span>
                </li>
                </Link>
                <Link to={'/exams'} style={{textDecoration: 'none'}}>
                <li>
                    <ComputerOutlined className='icon'/>
                    <span>Exams</span>
                </li>
                </Link>
                
                <p className="title">ACCOUNT</p>
                <Link to={'/profile'} style={{textDecoration: 'none'}}>
                <li>
                    <AccountCircle className='icon'/>
                    <span>Profile</span>
                </li>
                </Link>
                <Link to={'/login'} style={{textDecoration: 'none'}}>
                <li>
                    <Logout className='icon'/>
                    <span>LogOut</span>
                </li>
                </Link>
            </ul>
            )
        }

        </div>
        <div className="bottom">
            <div className="white"></div>
            <div className="black"></div>
        </div>
    </div>
  )
}
