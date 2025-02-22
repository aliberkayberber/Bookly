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

// Initial state for a new borrow
const initialBorrow = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  returnDate: "",
  book: {},
};

// Initial state for updating a borrow
const updateBorrowArray = {
  borrowerName: "",
  borrowingDate: "",
  returnDate: "",
};

// Initial state for the first borrow
const firstBorrow = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  book: {},
};

// Initial state for posting a borrow
const postBorrow = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  bookForBorrowingRequest: {
    id: 0,
    name: "string",
    publicationYear: 0,
    stock: 0,
  },
};

// Base URL for the API
//const BaseUrl = "http://localhost:8080";
const BaseUrl = import.meta.env.VITE_BASE_URL;

export default function Borrow() {
  // State variables
  const [newBorrow, setNewBorrow] = useState(postBorrow);
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);
  const [updateBorrow, setUpdateBorrow] = useState(updateBorrowArray);
  const [update, setUpdate] = useState(false);

  // Fetch borrows and books from the API when the component mounts or when 'update' changes
  useEffect(() => {
    const getBorrows = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/borrows");
        setBorrows(response.data);
        console.log(response.data);
        setUpdate(true);
      } catch (error) {
        console.error(error);
        toast.error("Borrow could not be Fetched", {
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
    const getBooks = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/books");
        setBooks(response.data);
        console.log(response.data);
        //setUpdate(true);
      } catch (error) {
        console.error(error);
      }
    };

    getBooks();
    getBorrows();
  }, [update]);

  // Function to handle the post request
  const handlePost = async () => {
    books.map((book) => {
      if (book.id === newBorrow.bookForBorrowingRequest.id) {
        newBorrow.bookForBorrowingRequest.name = book.name;
        newBorrow.bookForBorrowingRequest.publicationYear =
          book.publicationYear;
        newBorrow.bookForBorrowingRequest.stock = book.stock;
      }
    });
    try {
      await axios.post(BaseUrl + "/api/v1/borrows", newBorrow);
      setUpdate(false);
      //handleAlert("Borrow Added");
      toast("Borrow Added", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
      });
      setNewBorrow(initialBorrow);
      document.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Borrow could not be Added", {
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
      await axios.delete(BaseUrl + "/api/v1/borrows/" + id);
      //handleAlert("Borrow Deleted");
      toast("Borrow Deleted", {
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
      toast.error("Borrow could not be Deleted", {
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

  // Handle setting the form for updating a borrow
  const handleUpdateForm = (borrow) => {
    setUpdateBorrow(borrow);
  };

  // Function to handle the put request
  const handleUpdateBorrow = async () => {
    books.map((book) => {
      if (book.id === updateBorrow.book.id) {
        updateBorrow.book = book;
      }
    });
    try {
      await axios.put(
        BaseUrl + "/api/v1/borrows/" + updateBorrow.id,
        updateBorrow
      );
      //handleAlert("Borrow Updated");
      toast("Borrow Updated", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
      });
      setUpdateBorrow(initialBorrow);
      setUpdate(false);
      document.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Borrow could not be Updated", {
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
        <Typography
          variant="h4"
          style={{ textAlign: "center", margin: "20px" }}
        >
          New Book Borrow
        </Typography>
        <div className="post">
          {/* Input fields for adding a new borrow */}
          <InputHandler
            initial={firstBorrow}
            inputState={newBorrow}
            inputStateSetter={setNewBorrow}
            book={books}
          />
          <Button variant="contained" onClick={handlePost}>
            Add Book Borrow
          </Button>
        </div>
      </div>

      <div className="page-container">
        <Typography
          variant="h4"
          style={{ textAlign: "center", margin: "20px" }}
        >
          Update Book Borrow
        </Typography>
        <div className="post">
          {/* Input fields for updating an existing borrow */}
          <InputHandler
            initial={updateBorrowArray}
            inputState={updateBorrow}
            inputStateSetter={setUpdateBorrow}
            book={books}
          />
          <Button variant="contained" onClick={handleUpdateBorrow}>
            Update Book Borrow
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
              <TableHeader initial={initialBorrow} />
            </TableHead>
            <TableBody>
              {/* Table rows for displaying borrows */}
              {borrows?.map((borrows) => (
                <TableRow key={borrows.id}>
                  <TableCell align="center">{borrows.borrowerName}</TableCell>
                  <TableCell align="center">{borrows.borrowerMail}</TableCell>
                  <TableCell align="center">{borrows.borrowingDate}</TableCell>
                  <TableCell align="center">{borrows.returnDate}</TableCell>
                  <TableCell align="center">{borrows.book.name}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon onClick={() => handleDelete(borrows.id)} />
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => handleUpdateForm(borrows)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer />
      </div>
    </div>
  );
}
