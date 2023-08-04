import { AccountCircle, DarkModeOutlined, LanguageOutlined, Mail, MailOutline, Notifications, NotificationsOutlined, SearchOutlined } from '@mui/icons-material'
import './NavBar.scss'
import { Accordion, Avatar, Badge, Icon, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import { UserContext } from '../../contex/UserContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';



export const NavBar = ({handleOpen}) => {

  
    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
      setOpen(!open);
    };

    const [userData, setUserData] = useState();
    const { currentUser } = useContext(UserContext);
    const userDocRef = doc(db, "users", currentUser.uid);
    const getUserDoc = async () => await getDoc(userDocRef);
    
    getUserDoc().then((userDoc) => {
         const data = userDoc.data()
         setUserData(data);
    })
  

  return (
    <div className='navBar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='search...' />
          <SearchOutlined/>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlined className='icon'/>
            English
          </div>
          <Tooltip title="Notifications" arrow>
          <div className="item" onClick={handleClick}>
            <Badge color="secondary" badgeContent={3}>
              <NotificationsOutlined />
            </Badge>
          </div>
          </Tooltip>

          <Tooltip title="Light/Dark mode" arrow>
          <div className="item">
            <DarkModeOutlined className='icon'/>
          </div>
          </Tooltip>
          <Tooltip title="Profile" arrow>
          <div className="item" onClick={handleOpen}>
            
            <Avatar src={userData?.profilePictureURL} alt={userData?.fullname} className='avatar'> {userData?.fullname.charAt(0)} </Avatar>
            
          </div>
          </Tooltip>
        </div>
      </div>

      {open && (
        <Paper elevation={3} className="notification-container">
          {/* Your notification logs here */}
          <div className="notificationItem"><p>Jane Doe created an account</p></div>
          <div className="notificationItem"><p>Eniola Davis just took your exam</p></div>
          <div className="notificationItem"><p>Notification 2</p></div>
        </Paper>
      )}


      
    </div>
  )
}
