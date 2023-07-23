import React, { useEffect, useState } from "react";
import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import Teachersdata from "../../TeachersData";

export const Tablec = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersData = await Teachersdata("Teacher");
        setTeachers(teachersData);
      } catch (error) {
        console.log("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  let tableHead = ["FullName", "ID", "Status", "Date"];

  const formatDateTime = (timestamp) => {
    const date = timestamp?.toDate();
    return date?.toLocaleString();
  };
  

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">{tableHead[0]}</TableCell>
            <TableCell className="tableCell">{tableHead[1]}</TableCell>
            <TableCell className="tableCell">{tableHead[2]}</TableCell>
            <TableCell className="tableCell">{tableHead[3]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teacher,index) => (
            <TableRow key={teacher.fullname}>
              <TableCell className="tableCell">
                <div className="nameIcon">
                  <Avatar
                    src={`https://example.com/avatars/${teacher.fullname}.jpg`}
                    alt={`${teacher.fullname}`}
                    className="avatar"
                  />
                  {teacher.fullname}
                </div>
              </TableCell>
              <TableCell className="tableCell">{index}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${teacher.approved ? 'Approved' : 'UnApproved'}`}>
                  {teacher.approved ? 'Approved' : 'UnApproved'}
                </span>
              </TableCell>
              <TableCell className="tableCell">{formatDateTime(teacher.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
