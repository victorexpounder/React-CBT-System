import {BookOutlined, ComputerOutlined, KeyboardArrowUp,PersonOutlined } from '@mui/icons-material'
import './widget.scss'
import { red } from '@mui/material/colors';
import { Userdata } from '../../Userdata';
import Teachersdata from '../../TeachersData';
import { useEffect, useState } from 'react';
export const Widget = ({type}) => {

    let data;
    const userData = Userdata();
    const [teachers, setTeachers] = useState(null);

      const fetchTeachers = async () => {
        try {
          const teachersData = await Teachersdata("Teacher");
          setTeachers(teachersData);
        } catch (error) {
          console.log('Error fetching teachers:', error);
        }
      };
    
      useEffect(() => {
        fetchTeachers();
      }, []);

      console.log(teachers);
    const approvedTeachers = teachers?.filter((teacher) => teacher.approved === true);
    const unApprovedTeachers = teachers?.filter((teacher) => teacher.approved === false);
      

    switch(type){
      case "teacherApproved":
        data={
        title: "TEACHERS",
        link: "see all approved teachers",
        icon: <PersonOutlined className='icon' style={{color: "green", backgroundColor: "rgba(0, 255, 0, 0.2)"}}/>,
        topText: "Approved",
        color: "positive",
        numbers: approvedTeachers?.length
        };
        break;
      case "teacherUnapproved":
        data={
        title: "TEACHERS",
        link: "see all unapproved teachers",
        icon: <PersonOutlined className='icon' style={{color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)"}}/>,
        topText: "UnApproved",
        color: "negative",
        numbers: unApprovedTeachers?.length
        };
        break;
      case "teacherTotal":
        data={
        title: "TEACHERS",
        link: "see all teachers",
        icon: <PersonOutlined className='icon' style={{color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)"}}/>,
        topText: "Total",
        numbers: teachers?.length
        };
        break;
      case "subjects":
        data={
        title: "SUBJECTS",
        link: "see your Subjects",
        icon: <BookOutlined className='icon' style={{color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)"}}/>,
        topText: "Total",
        numbers : userData?.subjects.length
        };
        break;
      case "examTotal":
        data={
        title: "EXAMS",
        link: "see all your exams",
        icon: <ComputerOutlined className='icon' style={{color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)"}}/>,
        topText: "Total"
        };
        break;
      case "examOngoing":
        data={
        title: "EXAMS",
        link: "see all ongoing exams",
        icon: <ComputerOutlined className='icon' style={{color: "green", backgroundColor: "rgba(0, 255, 0, 0.2)"}}/>,
        topText: "Ongoing",
        color: "positive",
        };
        break;
        default:
          break;
    }
  return (
    <div className='widget'>
        <div className="right">
          <span className="title">{data.title}</span>
          <span className="counter">{data.numbers}</span>
          <span className="link">{data.link}</span>
        </div>
        <div className="left">
          <div className={`percentage ${data.color}`}>
            <KeyboardArrowUp/>
            {data.topText}
          </div>
          {data.icon}
        </div>
    </div>
  )
}
