import React from 'react'

export const SubjectCard = () => {
  return (
    <div className='subjectCard'>
        <Card sx={{ minWidth: 275 }} className='Concard'>
            <CardContent>
                <div className="title">Edit Subject</div>
                <div className="details">
                    
                </div>
            </CardContent>
            <CardActions className='cardActions'>
                <Button size="small">Edit</Button>
                <Button size="small">LogOut</Button>
            </CardActions>
            </Card>
    </div>
  )
}
