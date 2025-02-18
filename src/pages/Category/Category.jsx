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
import InputHandler from "../../components/InputHandler/InputHandler";
import TableHeader from "../../components/TableHeader/TableHeader";
import { Update } from "@mui/icons-material";

const initialCategory = {
  name: "",
  description: "",
};

const BaseUrl = "http://localhost:8080";

export default function Author() {
  const [newCategory, setNewCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(initialCategory);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/categories");
        setCategory(response.data);
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
      await axios.post(BaseUrl + "/api/v1/categories", newCategory);
      setUpdate(false);
      handleAlert("Category Added");
      setNewCategory(initialCategory);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(BaseUrl + "/api/v1/categories/" + id);
      handleAlert("Author Deleted");
      setUpdate(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateForm = (category) => {
    setUpdateCategory(category);
    console.log(category);
  };

  const handleUpdateCategory = async () => {
    await axios.put(
      BaseUrl + "/api/v1/categories/" + updateCategory.id,
      updateCategory
    );
    setUpdateCategory(initialCategory);
    handleAlert("Category Updated");
    setUpdate(false);
  };

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Category
      </Typography>
      <div className="post">
        {/* {Object.keys(initialAuthor).map((key) => {
          return (
            <TextField
              key={key}
              id="outlined-basic"
              label={key}
              variant="outlined"
              value={newAuthor[key]}
              onChange={(e) =>
                setNewAuthor({ ...newAuthor, [key]: e.target.value })
              }
            />
          );
        })} */}
        <InputHandler
          initial={initialCategory}
          inputState={newCategory}
          inputStateSetter={setNewCategory}
        />
        <Button variant="contained" onClick={handlePost}>
          Add Category
        </Button>
      </div>

      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Update Category
      </Typography>
      <div className="post">
        {/* {Object.keys(initialAuthor).map((key) => {
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
        })} */}
        <InputHandler
          initial={initialCategory}
          inputState={updateCategory}
          inputStateSetter={setUpdateCategory}
        />
        <Button variant="contained" onClick={handleUpdateCategory}>
          Update Category
        </Button>
      </div>

      <Typography variant="h3" align="center" gutterBottom>
      Category
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {/* <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Birthday</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow> */}
            <TableHeader initial={initialCategory} />
          </TableHead>
          <TableBody>
            {category?.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="center">{category.description}</TableCell>
                <TableCell align="center">
                  <DeleteIcon onClick={() => handleDelete(category.id)} />
                </TableCell>
                <TableCell align="center">
                  <EditIcon onClick={() => handleUpdateForm(category)} />
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
