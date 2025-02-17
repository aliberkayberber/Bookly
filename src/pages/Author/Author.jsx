import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Author.css";

const initialAuthor = {
  name: "",
  birthDate: "",
  country: "",
};

const BaseUrl = "http://localhost:8080";

export default function Author() {
  const [newAuthor, setNewAuthor] = useState();
  const [authors, setAuthors] = useState([]);
  const [updateAuthor, setUpdateAuthor] = useState(initialAuthor);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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

  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handlePost = async () => {
    try {
      await axios.post(BaseUrl + "/api/v1/authors", newAuthor);
      setUpdate(false);
      handleAlert("Author Added");
      setNewAuthor(initialAuthor);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(BaseUrl + "/api/v1/authors/" + id);
      handleAlert("Author Deleted");
      setUpdate(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateForm = (author) => {
    setUpdateAuthor(author);
    console.log(author);
  };

  const handleUpdateAuthor = async () => {
    await axios.put(BaseUrl + '/api/v1/authors/'+ updateAuthor.id, updateAuthor);
    setUpdateAuthor(initialAuthor);
    handleAlert("Doctor Updated");
    setUpdate(false);
  };

  return (
    <div>
        <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Author
      </Typography>
      <div className="post">
        {Object.keys(initialAuthor).map((key) => {
          return (
            <TextField
              key={key}
              id="outlined-basic"
              label={key}
              variant="outlined"
              onChange={(e) =>
                setNewAuthor({ ...newAuthor, [key]: e.target.value })
              }
            />
          );
        })}
        <Button variant="contained" onClick={handlePost}>
          Add Author Doctor
        </Button>
      </div>

      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Update Author
      </Typography>
      <div className="post">
        {Object.keys(initialAuthor).map((key) => {
          return (
            <TextField
              key={key}
              id="outlined-basic"
              label={key}
              variant="outlined"
              value={updateAuthor[key]}
              onChange={(e) =>
                setUpdateAuthor((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          );
        })}
        <Button variant="contained" onClick={handleUpdateAuthor}>
          Update Author
        </Button>
      </div>

      <Typography variant="h3" align="center" gutterBottom>
        Authors
      </Typography>
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
                <TableCell align="center">
                  <DeleteIcon onClick={() => handleDelete(authors.id)} />
                </TableCell>
                <TableCell align="center">
                  <EditIcon onClick={() =>handleUpdateForm(authors)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {alert && <h1>{alertMessage}</h1>}
    </div>
  );
}
