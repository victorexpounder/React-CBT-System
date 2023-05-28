import React from 'react'
import "../UserCard/UserCard.scss"
import { Avatar, Backdrop, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';


export const AccountCard = () => {
    const navigate = useNavigate();
  return (
    <div className='userCard'>
        <Card sx={{ minWidth: 275 }} className='Concard'>
            <CardContent>
                <div className="title">Profile Information</div>
                <div className="details">
                <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar' sx={{ width: 100, height: 100 }}/>
                <div className="detail">
                    <h1 className="itemTitle">Snow Chapper</h1>
                    <div className="detailItem">
                        <span className="itemKey"> Email: 1boy@gmail.com</span>
                        <span className="itemKey">Role: teacher</span>

                    </div>
                </div>
                </div>
            </CardContent>
            <CardActions className='cardActions'>
            <Link to={'/profile'} style={{textDecoration: 'none'}}>
                <Button size="small">Edit</Button>
            </Link>
                <Button size="small">LogOut</Button>
            </CardActions>
            </Card>
    </div>
  )
}
