import  './SideBar.scss'
import { AccountBalanceWalletTwoTone, AccountBoxRounded, AccountCircle, Dashboard, Logout } from '@mui/icons-material'
import { Person2Outlined, BookOutlined, ComputerOutlined, BarChart, } from '@mui/icons-material'
import { Link } from 'react-router-dom'


export const SideBar = () => {
  return (
    <div className='sideBar'>
        <div className="top">
            <Link to={'/'} style={{textDecoration: 'none'}}>
            <span className="logo">BCBT</span>
            </Link>
        </div>
        <hr />
        <div className="center">
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
                <li>
                    <BarChart className='icon'/>
                    <span>Stats</span>
                </li>
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
        </div>
        <div className="bottom">
            <div className="white"></div>
            <div className="black"></div>
        </div>
    </div>
  )
}
