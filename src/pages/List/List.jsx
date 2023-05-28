import { Menu} from '@mui/icons-material'
import { NavBar } from "../../components/NavBar/NavBar"
import "./List.scss"
import { SideBar } from "../../components/SideBar/SideBar"
import { useState } from "react"
import { Datatable } from '../../components/Datatable/Datatable'
import { Backdrop } from '@mui/material'
import { AccountCard } from '../../components/AccountCard/AccountCard'

export const List = () => {

    const [sidetoggle, setSidetoggle] = useState('hidden')
  function hideMenu (){
    
    setSidetoggle('show')
  }
  function showMenu (){
    
    setSidetoggle('hidden')
    
  }

  const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

  return (
    <div className='list'>
      <div className={`sideBar ${sidetoggle}`}>
        <SideBar />
      </div>

      <div className={`menu`} onClick={hideMenu}>
      <Menu />
      </div>

      <div className="listContainer" onClick={showMenu}>
        <NavBar handleOpen={handleOpen}/>
        <Datatable/>

        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        
        <AccountCard/>

      </Backdrop>
      </div>
    </div>
  )
}
