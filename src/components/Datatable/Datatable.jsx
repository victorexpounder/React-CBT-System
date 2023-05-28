import { Avatar, Backdrop,} from "@mui/material";
import "./Datatable.scss"
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid"
import { UserCard } from "../UserCard/UserCard";

export const Datatable = () => {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const actionColumn =[{field: "action", headerName: "Action", width:200, renderCell: ()=>{
        return(
            <div className="cellAction">
                <div className="viewButton" onClick={handleOpen}>view</div>
                <div className="approveButton">approve</div>
                <div className="deleteButton">Delete</div>
            </div>
        )
    } }]
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fullname', headerName: 'Teacher', width: 230, description: 'Fullname and profile pic of teacher', renderCell: (params)=>{
            return(
                <div className="cellWithImg">
                    {params.row.avatar}
                    {params.row.fullname}
                </div>
            )
        } },
        
        {
          field: 'email',
          headerName: 'Email',
          description: 'email of teacher',
          width: 230,
        },
        {
          field: 'role',
          headerName: 'Role',
          description: 'role e.g(teacher,principal,director)',
          width: 160,
        },
        {
          field: 'status',
          headerName: 'Status',
          description: 'approved/unapproved',
          width: 160,
          renderCell: (params)=>{
            return(
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            )
          }
        },
      ];
      
      const rows = [
        { id: 1, fullname: 'Snow chapper', status:"approved", email: "1boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 2, fullname: 'John Maduka', status:"unapproved", email: "2boy@gmail.com", avatar: <Avatar src="exels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Snow chaper" className='avatar'/>, role: "teacher"},
        { id: 3, fullname: 'Snow chapper', status:"approved", email: "3boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 4, fullname: 'Snow chapper', status:"approved", email: "4boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 5, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 6, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 7, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 8, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 9, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 10, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 11, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 12, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 13, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 14, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 15, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 16, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 17, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 18, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 19, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        { id: 20, fullname: 'Snow chapper', status:"approved", email: "5boy@gmail.com", avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>, role: "teacher"},
        
      ];
      

  return (
    
        <div className="datatable">
        <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
        <div className="card">
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        
        <UserCard/>

      </Backdrop>
        
        </div>
        
        </div>
    
  )
}
