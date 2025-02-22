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
import "../../App.css";

// Initial state for a new book
const initialBook = {
  name: "",
  publicationYear: "",
  stock: "",
  author: {},
  publisher: {},
  categories: {},
};

// Base URL for the API
//const BaseUrl = "http://localhost:8080";
const BaseUrl = import.meta.env.VITE_BASE_URL;

export default function Book() {
  // State variables for new book, books, authors, publishers, categories, updateBook, and update
  const [newBook, setNewBook] = useState([]);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [updateBook, setUpdateBook] = useState(initialBook);
  const [update, setUpdate] = useState(false);

  // Fetch books, authors, publishers, and categories from the API when the component mounts or when 'update' changess
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/books");
        setBooks(response.data);
        console.log(response.data);
        setUpdate(true);
      } catch (error) {
        console.error(error);
        toast.error("Book could not be Fetched", {
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

    const getPublishers = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/publishers");
        setPublishers(response.data);
        console.log(response.data);
        setUpdate(true);
      } catch (error) {
        console.error(error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/categories");
        setCategories(response.data);
        setUpdate(true);
      } catch (error) {
        console.error(error);
      }
    };

    getAuthors();
    getPublishers();
    getCategories();
    getBooks();
    console.log(books);
  }, [update]);

  // Post a new book to the API
  const handlePost = async () => {
    authors.map((author) => {
      if (author.id === newBook.author.id) {
        newBook.author = author;
      }
    });
    publishers.map((publisher) => {
      if (publisher.id === newBook.publisher.id) {
        newBook.publisher = publisher;
      }
    });
    categories.map((category) => {
      if (category.id === newBook.categories.id) {
        newBook.categories = [category];
      }
    });
    try {
      await axios.post(BaseUrl + "/api/v1/books", newBook);
      setUpdate(false);
      // handleAlert("Book Added");
      toast("Book Added", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
      });
      setNewBook(initialBook);
      document.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Book could not be Added", {
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

  // Delete a book from the API
  const handleDelete = async (id) => {
    try {
      await axios.delete(BaseUrl + "/api/v1/books/" + id);
      //handleAlert("Book Deleted");
      toast("Book Deleted", {
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
      toast.error("Book could not be Deleted", {
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

  // Handle setting the form for updating a book
  const handleUpdateForm = (book) => {
    setUpdateBook(book);
  };

  // Update a book in the API
  const handleUpdateBook = async () => {
    authors.map((author) => {
      if (author.id === updateBook.author.id) {
        updateBook.author = author;
      }
    });
    publishers.map((publisher) => {
      if (publisher.id === updateBook.publisher.id) {
        updateBook.publisher = publisher;
      }
    });
    categories.map((category) => {
      if (category.id === updateBook.categories.id) {
        updateBook.categories = [category];
      }
    });
    try {
      await axios.put(BaseUrl + "/api/v1/books/" + updateBook.id, updateBook);
      setUpdateBook(initialBook);
      //handleAlert("Book Updated");
      toast("Book Updated", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
      });
      setUpdate(false);
      document.location.reload();
    } catch (error) {
      console.error;
      toast.error("Book could not be Updated", {
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
      <div className="page-container">
        <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
          New Book
        </Typography>
        <div className="post">
          {/* Input fields for adding a new book */}
          <InputHandler
            initial={initialBook}
            inputState={newBook}
            inputStateSetter={setNewBook}
            author={authors}
            publisher={publishers}
            category={categories}
          />
          <Button variant="contained" onClick={handlePost}>
            Add Book
          </Button>
        </div>
      </div>

      <div className="page-container">
        <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
          Update Book
        </Typography>
        <div className="post">
          {/* Input fields for updating an existing book */}
          <InputHandler
            initial={initialBook}
            inputState={updateBook}
            inputStateSetter={setUpdateBook}
            author={authors}
            publisher={publishers}
            category={categories}
          />
          <Button variant="contained" onClick={handleUpdateBook}>
            Update Book
          </Button>
        </div>
      </div>

      <div className="page-table">
        <Typography variant="h3" align="center" gutterBottom>
          Books
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {/* Table header */}
              <TableHeader initial={initialBook} />
            </TableHead>
            <TableBody>
              {/* Table rows for displaying books */}
              {books?.map((book) => (
                <TableRow key={book.id}>
                  <TableCell align="center">{book.name}</TableCell>
                  <TableCell align="center">{book.publicationYear}</TableCell>
                  <TableCell align="center">{book.stock}</TableCell>
                  <TableCell align="center">{book.author.name}</TableCell>
                  <TableCell align="center">{book.publisher.name}</TableCell>
                  <TableCell align="center">
                    {book.categories.map((category) => category.name).join(", ")}
                  </TableCell>
                  {console.log(book.categories)}
                  <TableCell align="center">
                    <DeleteIcon onClick={() => handleDelete(book.id)} />
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => handleUpdateForm(book)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ToastContainer />
    </div>
  );
}
