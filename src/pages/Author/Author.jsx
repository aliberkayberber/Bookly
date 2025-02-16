import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from "@mui/material";

const initialAuthor = {
  name: "",
  birthDate: "",
  country: "",
};

const BaseUrl = "http://localhost:8080";

export default function Author() {
  const [authors, setAuthors] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/authors");
        setAuthors(response.data);
        console.log(response.data);
        setUpdate(true);
      } catch (error) {
        console.error(error);
      }
    };

    getAuthors();
  }, [update]);















  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>Authors</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Birthday</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors?.map((authors) => (
              <TableRow
                key={authors.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{authors.id}</TableCell>
                <TableCell align="center" component="th" scope="row">
                  {authors.name}
                </TableCell>
                <TableCell align="center">{authors.birthDate}</TableCell>
                <TableCell align="center">{authors.country}</TableCell>
                <TableCell align="center"><DeleteIcon/></TableCell>
                <TableCell align="center"><EditIcon/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
