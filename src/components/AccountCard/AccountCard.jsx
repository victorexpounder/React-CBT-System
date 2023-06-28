import React, { useContext, useState } from 'react'
import "../UserCard/UserCard.scss"
import { Avatar, Backdrop, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contex/UserContext';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';


export const AccountCard = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const userDocRef = doc(db, "users", currentUser.uid);
    const getUserDoc = async () => await getDoc(userDocRef);
    
    getUserDoc().then((userDoc) => {
         const data = userDoc.data()
         setUserData(data);
    })
    
  return (
    <div className='userCard'>
        <Card sx={{ minWidth: 275 }} className='Concard'>
            <CardContent>
                <div className="title">Profile Information</div>
                <div className="details">
                <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar' sx={{ width: 100, height: 100 }}/>
                <div className="detail">
                    <h1 className="itemTitle">{userData?.fullname}</h1>
                    <div className="detailItem">
                        <span className="itemKey"> Email: {currentUser.email}</span>
                        <span className="itemKey">Role: {userData?.role}</span>

                    </div>
                </div>
                </div>
            </CardContent>
            <CardActions className='cardActions'>
            <Link to={'/profile'} style={{textDecoration: 'none'}}>
                <Button size="small">Edit</Button>
            </Link >

            <Link to={'/login'} style={{textDecoration: 'none'}}>
                <Button size="small">LogOut</Button>
            </Link>
            </CardActions>
            </Card>
    </div>
  )
}
