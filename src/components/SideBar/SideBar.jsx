import  './SideBar.scss'
import { AccountBalanceWalletTwoTone, AccountBoxRounded, AccountCircle, Dashboard, Logout } from '@mui/icons-material'
import { Person2Outlined, BookOutlined, ComputerOutlined, BarChart, } from '@mui/icons-material'


export const SideBar = () => {
  return (
    <div className='sideBar'>
        <div className="top">
            <span className="logo">BCBT</span>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <li>
                    <Dashboard className='icon'/>
                    <span>Dashboard</span>
                </li>
                <p className="title">TOOLS</p>
                <li>
                    <Person2Outlined className='icon'/>
                    <span>Teachers</span>
                </li>
                <li>
                    <BookOutlined className='icon'/>
                    <span>Subjects</span>
                </li>
                <li>
                    <ComputerOutlined className='icon'/>
                    <span>Exams</span>
                </li>
                <li>
                    <BarChart className='icon'/>
                    <span>Stats</span>
                </li>
                <p className="title">ACCOUNT</p>
                <li>
                    <AccountCircle className='icon'/>
                    <span>Profile</span>
                </li>
                <li>
                    <Logout className='icon'/>
                    <span>LogOut</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="white"></div>
            <div className="black"></div>
        </div>
    </div>
  )
}
