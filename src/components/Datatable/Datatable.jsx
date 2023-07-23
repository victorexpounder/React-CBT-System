import { Avatar, Backdrop,} from "@mui/material";
import "./Datatable.scss"
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid"
import { UserCard } from "../UserCard/UserCard";
import React, { useEffect} from "react";
import Teachersdata from "../../TeachersData";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";


export const Datatable = () => {

    const [open, setOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (row) => {
        setOpen(true);
        setSelectedTeacher(row)
    };

    const handleApprove = async (id, approved) => {
      try {
        const userDocRef = doc(db, "users", id);
        
        // Update the fullname and email fields in Firestore
        await updateDoc(userDocRef, {
          approved: !approved,
        });
    
        console.log("User approved successfully!");
       
      } catch (error) {
        console.log("Error updating fullname and email:", error);
      }
    };

    const actionColumn =[{field: "action", headerName: "Action", width:200, renderCell: (params)=>{
        return(
            <div className="cellAction">
                <div className="viewButton" onClick={()=>handleOpen(params.row)}>view</div>
                <div className={`${params.row.approved? "notApprove" : 'approveButton'}`} onClick={() => handleApprove(params.row.userId, params.row.approved)}>{params.row.approved? 'UnApprove' : 'approve'}</div>
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
                <div className={`cellWithStatus ${params.row.approved? "approved" : "unapproved"}`}>
                    {params.row.approved? "Approved" : "UnApproved"}
                </div>
            )
          }
        },
      ];
      

      

      const [rows, setRows] = useState([
        
      ]);
      

        const fetchTeachers = async () => {
          try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("role", "==", "Teacher"));
            const querySnapshot = await getDocs(q);
            const users = [];

            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              // Include the userId in the user object
              const user = {
                userId: doc.id,
                ...userData,
              };
              users.push(user);
            });
            const teachersData = users;
    
            // Map through the fetched teachersData and set the 'id' property to 'Userid'
            const updatedTeachersData = teachersData.map((teacher, index) => ({
              ...teacher,
              id: index,
            }));
    
            setRows(updatedTeachersData);
          } catch (error) {
            console.log("Error fetching teachers:", error);
          }
        };
    
        fetchTeachers();


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
        
      />
       {open &&
        <div className="card">
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        >
        
        <UserCard user={selectedTeacher}/>

      </Backdrop>
        
        </div>
      }
        
        </div>
    
  )
}
