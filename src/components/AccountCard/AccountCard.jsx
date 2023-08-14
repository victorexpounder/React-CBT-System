import React, { useContext, useEffect, useState } from 'react'
import "../UserCard/UserCard.scss"
import { Avatar, Backdrop, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contex/UserContext';
import { db } from '../../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';


export const AccountCard = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const userDocRef = doc(db, "users", currentUser.uid);
    // Subscribe to document changes using onSnapshot
  useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      const data = snapshot.data();
      setUserData(data);
      
    });

    // Clean up the subscription when component unmounts
    return () => unsubscribe();
  }, [userDocRef]);
    
  return (
    <div className='userCard'>
        <Card sx={{ minWidth: 275 }} className='Concard'>
            <CardContent>
                <div className="title">Profile Information</div>
                <div className="details">
                <Avatar src={userData?.profilePictureURL} alt="Remy Sharp" className='avatar' sx={{ width: 100, height: 100 }}>{userData?.fullname.charAt(0)}</Avatar>
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
