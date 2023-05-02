import {BookOutlined, ComputerOutlined, KeyboardArrowUp,PersonOutlined } from '@mui/icons-material'
import './widget.scss'
import { red } from '@mui/material/colors';

export const Widget = ({type}) => {

    let data;

    switch(type){
      case "teacherApproved":
        data={
        title: "TEACHERS",
        link: "see all approved teachers",
        icon: <PersonOutlined className='icon' style={{color: "green", backgroundColor: "rgba(0, 255, 0, 0.2)"}}/>,
        topText: "Approved",
        color: "positive"
        };
        break;
      case "teacherUnapproved":
        data={
        title: "TEACHERS",
        link: "see all unapproved teachers",
        icon: <PersonOutlined className='icon' style={{color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)"}}/>,
        topText: "UnApproved",
        color: "negative"
        };
        break;
      case "teacherTotal":
        data={
        title: "TEACHERS",
        link: "see all teachers",
        icon: <PersonOutlined className='icon' style={{color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)"}}/>,
        topText: "Total",
        };
        break;
      case "subjects":
        data={
        title: "SUBJECTS",
        link: "see your Subjects",
        icon: <BookOutlined className='icon' style={{color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)"}}/>,
        topText: "Total",
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
          <span className="counter">16700</span>
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
