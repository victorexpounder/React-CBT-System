import { AccountCircle, DarkModeOutlined, LanguageOutlined, Mail, MailOutline, Notifications, NotificationsOutlined, SearchOutlined } from '@mui/icons-material'
import './NavBar.scss'
import { Accordion, Avatar, Badge, Icon, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';



export const NavBar = ({handleOpen}) => {

  
    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
      setOpen(!open);
    };
  

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
            
            <Avatar src="https://images.pexels.com/photos/10909254/pexels-photo-10909254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>
            
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
