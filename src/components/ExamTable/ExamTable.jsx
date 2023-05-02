import "./ExamTable.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from "@mui/material";

export const ExamTable = () => {
  let rows=[
    {
        subject: "Economics",
        class: "SSS1",
        date: "2023/15/04"
        },
        {
        subject: "Agric",
        class: "SSS2",
        date: "2023/15/04"
        },
        {
        subject: "English",
        class: "SS3",
        date: "2023/15/04"
        }];
        let tableHead = ['subject', 'class', 'date' ]


  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">{tableHead[0]}</TableCell>
          <TableCell className="tableCell">{tableHead[1]}</TableCell>
          <TableCell className="tableCell">{tableHead[2]}</TableCell>
          
          
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
          >
            <TableCell className="tableCell">{row.subject}</TableCell>
            <TableCell className="tableCell">{row.class}</TableCell>
            <TableCell className="tableCell">{row.date}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
