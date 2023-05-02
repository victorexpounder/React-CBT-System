import { AccountCircle, DarkModeOutlined, LanguageOutlined, Mail, MailOutline, Notifications, NotificationsOutlined, SearchOutlined } from '@mui/icons-material'
import './NavBar.scss'
import { Accordion, Avatar, Badge, Icon } from '@mui/material'

export const NavBar = () => {
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
          <div className="item">
            <Badge color="secondary" badgeContent={3}>
              <NotificationsOutlined />
            </Badge>
          </div>
          <div className="item">
            <DarkModeOutlined className='icon'/>
          </div>
          <div className="item">
            
            <Avatar src="https://images.pexels.com/photos/10909254/pexels-photo-10909254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>
            
          </div>
        </div>
      </div>
    </div>
  )
}
