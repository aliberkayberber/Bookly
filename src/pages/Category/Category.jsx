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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initial state for a new category
const initialCategory = {
  name: "",
  description: "",
};

// Base URL for the API
//const BaseUrl = "http://localhost:8080";
const BaseUrl = import.meta.env.VITE_BASE_URL;

export default function Author() {
  // State variables
  const [newCategory, setNewCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(initialCategory);
  const [update, setUpdate] = useState(false);

  // Fetch categories from the API when the component mounts or when 'update' changes
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/categories");
        setCategory(response.data);
        console.log(response.data);
        setUpdate(true);
      } catch (error) {
        console.error(error);
        toast.error("Category could not be Fetched", {
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

    getCategories();
  }, [update]);

  // Function to handle the post request
  const handlePost = async () => {
    try {
      await axios.post(BaseUrl + "/api/v1/categories", newCategory);
      setUpdate(false);
      toast("Category Added", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
      });
      setNewCategory(initialCategory);
    } catch (error) {
      console.error(error);
      toast.error("Category could not be Added", {
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

  // Function to handle the delete request
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(BaseUrl + "/api/v1/categories/" + id);
      toast("Category Deleted", {
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
      toast.error("Category could not be Deleted", {
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

  // Handle setting the form for updating a category
  const handleUpdateForm = (category) => {
    setUpdateCategory(category);
    console.log(category);
  };

  // Function to handle the update request
  const handleUpdateCategory = async () => {
    try {
      await axios.put(
        BaseUrl + "/api/v1/categories/" + updateCategory.id,
        updateCategory
      );
      setUpdateCategory(initialCategory);
      toast("Category Updated", {
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
      toast.error("Category could not be Updated", {
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
        New Category
      </Typography>
      <div className="post">
        {/* Input fields for adding a new category */}
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
        {/* Input fields for updating an existing category */}
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
            {/* Table header */}
            <TableHeader initial={initialCategory} />
          </TableHead>
          <TableBody>
            {/* Table rows for displaying categories */}
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
      <ToastContainer/>
    </div>
  );
}
