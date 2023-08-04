import React from 'react'
import "./UserCard.scss"
import { Avatar, Backdrop, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export const UserCard = ({user}) => {
  return (
    <div className='userCard'>
        <Card sx={{ minWidth: 275 }} className='Concard'>
            <CardContent>
                <div className="title">Information</div>
                <div className="details">
                <Avatar src={user.profilePictureURL} alt="Remy Sharp" className='avatar' sx={{ width: 100, height: 100 }}>{user.fullname.charAt(0)}</Avatar>
                <div className="detail">
                    <h1 className="itemTitle">{user.fullname}</h1>
                    <div className="detailItem">
                        <span className="itemKey">Email: {user.email}</span>
                        <span className="itemKey">Role: {user.role}</span>
                        <span className="itemKey">Status: {user.approved? 'Approved' : 'UnApproved'}</span>
                        <span className="itemKey">Subjects: {user.subjects.join(", ")}</span>

                    </div>
                </div>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small">View More</Button>
            </CardActions>
            </Card>
    </div>
  )
}
