import React from 'react'
import './SelectExam.scss'
import { Logout } from '@mui/icons-material'
import { Autocomplete, TextField } from '@mui/material'

export const SelectExam = () => {
    const exams = [
        'Economics 2022',
        'Agric 2022',
        'Biology 2022',
        'commerce 2022',
        'Literature 2022',
        'Accounting 2022',
        'Mathematics 2022'
    ];
    const grade = [
        'SSS1',
        'SSS2',
        'SSS3'
    ];
    const session = [
        '2021/2022',
        '2022/2023',
        '2023/2024'
    ];
  return (
    <div className='selectView'>
        <div className="navBar">
            <h1>BCBT</h1>
            <div className="logout">
            <p>Log Out</p>
            <Logout/>
            </div>
        </div>

        <div className="content">
            <h3>Fill in details</h3>
            <div className="detailsCon">
            <TextField id="outlined-basic" label="Enter fullName" variant="outlined" fullWidth required/>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={grade}
                fullWidth
                renderInput={(params) => <TextField {...params} label="class" required />}
                />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={session}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Select session" required/>}
                />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={exams}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Availabe Exams" required/>}
                />
            
            </div>
            <div className="proceedButton">
                Proceed
            </div>
        </div>
    </div>
  )
}
