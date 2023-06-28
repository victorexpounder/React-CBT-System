import "./Table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from "@mui/material";

export const Tablec = () => {
  let rows=[
    {  
    id: "23336677",
    fullName: "Tom Ben",
    status: "Approved",
    date: "2023/9/04",
    avatar: <Avatar src="https://images.pexels.com/photos/10909254/pexels-photo-10909254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>
    },
    {
    
    id: "23336678",
    fullName: "Richardson Smith",
    status: "Approved",
    date: "2023/15/04",
    avatar: <Avatar src="htts://images.pexels.com/photos/10909254/pexels-photo-10909254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>
    },
    {
    
    id: "23336679",
    fullName: "Chukwuemeka Collins",
    status: "Approved",
    date: "2023/15/04",
    avatar: <Avatar src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>
    },
    {
    id: "23336680",
    fullName: "Ada Maduka",
    status: "UnApproved",
    date: "2023/15/04",
    avatar: <Avatar src="https://images.pexels.com/photos/16267190/pexels-photo-16267190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Remy Sharp" className='avatar'/>
    }];
  let tableHead = ['FullName', 'ID', 'Status', 'Date' ];

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
        {rows.map((row) => (
          <TableRow
            key={row.id}
          >
            <TableCell className="tableCell">
               <div className="nameIcon"> 
               {row.avatar} 
               {row.fullName}
               </div>
            </TableCell>
            <TableCell className="tableCell">{row.id}</TableCell>
            <TableCell className="tableCell">
               <span className={`status ${row.status}`}>{row.status}</span>   
            </TableCell>
            <TableCell className="tableCell">{row.date}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
