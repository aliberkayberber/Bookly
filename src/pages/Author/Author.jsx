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
import Button from "@mui/material/Button";
import "./Author.css";
import InputHandler from "../../components/InputHandler/InputHandler";
import TableHeader from "../../components/TableHeader/TableHeader";
import { Update } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initial state for a new author
const initialAuthor = {
  name: "",
  birthDate: "",
  country: "",
};

// Base URL for the API
//const BaseUrl = "http://localhost:8080";
const BaseUrl = import.meta.env.VITE_BASE_URL;

export default function Author() {
  // State variables
  const [newAuthor, setNewAuthor] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [updateAuthor, setUpdateAuthor] = useState(initialAuthor);
  const [update, setUpdate] = useState(false);

  // Fetch authors from the API when the component mounts or when 'update' changes
  useEffect(() => {
    const getAuthors = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/authors");
        setAuthors(response.data);
        console.log(response.data);
        setUpdate(true);
      } catch (error) {
        console.error(error);
        toast.error('Author could not be Fetched', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressx: undefined,
          });
      }
    };

    getAuthors();
  }, [update]);

  // Handle adding a new author
  const handlePost = async () => {
    try {
      await axios.post(BaseUrl + "/api/v1/authors", newAuthor);
      setUpdate(false);
      toast('Author Added', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
        });
      setNewAuthor(initialAuthor);
    } catch (error) {
      console.error(error);
      toast.error('Author could not be Added', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
        });
    }
  };

  // Handle deleting an author
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(BaseUrl + "/api/v1/authors/" + id);
      toast('Author Deleted', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
        });
      setUpdate(false);
    } catch (error) {
      console.error(error);
      toast.error('Author could not be Deleted', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
        });
    }
  };

  // Handle setting the form for updating an author
  const handleUpdateForm = (author) => {
    setUpdateAuthor(author);
    console.log(author);
  };

  // Handle updating an author
  const handleUpdateAuthor = async () => {
    try {
      await axios.put(
        BaseUrl + "/api/v1/authors/" + updateAuthor.id,
        updateAuthor
      );
      setUpdateAuthor(initialAuthor);
      //handleAlert("Doctor Updated");
      toast('Author Updated', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
        });
      setUpdate(false);
    } catch (error) {
      console.error(error);
      toast.error('Author could not be Updated', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
        });
    }

  };

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Author
      </Typography>
      <div className="post">
        {/* Input fields for adding a new author */}
        <InputHandler
          initial={initialAuthor}
          inputState={newAuthor}
          inputStateSetter={setNewAuthor}
        />
        <Button variant="contained" onClick={handlePost}>
          Add Author
        </Button>
      </div>

      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Update Author
      </Typography>
      <div className="post">
        {/* Input fields for updating an author */}
        <InputHandler
          initial={initialAuthor}
          inputState={updateAuthor}
          inputStateSetter={setUpdateAuthor}
        />
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
            {/* Table header */}
            <TableHeader initial={initialAuthor} />
          </TableHead>
          <TableBody>
            {/* Table rows for displaying authors */}
            {authors?.map((authors) => (
              <TableRow
                key={authors.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {authors.name}
                </TableCell>
                <TableCell align="center">{authors.birthDate}</TableCell>
                <TableCell align="center">{authors.country}</TableCell>
                <TableCell align="center">
                  <DeleteIcon onClick={() => handleDelete(authors.id)} />
                </TableCell>
                <TableCell align="center">
                  <EditIcon onClick={() => handleUpdateForm(authors)} />
                </TableCell>
                {/* {Object.keys(authors).map((key) => (
                  <TableCell align="center">{authors[key]}</TableCell>
                ))} */}
                {/* <TableCell align="center">
                  <DeleteIcon
                    onClick={() => handleDelete(authors.id)}
                    
                  />
                </TableCell>
                <TableCell align="center">
                  <EditIcon
                    
                    onClick={() => handleUpdateForm(authors)}
                  />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer/>
    </div>
  );
}
