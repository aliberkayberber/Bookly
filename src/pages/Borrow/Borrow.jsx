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
const initialBorrow = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  returnDate: "",
  book: {},
};

const updateBorrowArray = {
  borrowerName: "",
  borrowingDate: "",
  returnDate: "",
};

const firstBorrow = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  book: {},
};

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

const BaseUrl = "http://localhost:8080";

export default function Borrow() {
  const [newBorrow, setNewBorrow] = useState(postBorrow);
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);
  const [updateBorrow, setUpdateBorrow] = useState(updateBorrowArray);
  const [update, setUpdate] = useState(false);
  // const [alert, setAlert] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const getBorrows = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/borrows");
        setBorrows(response.data);
        console.log(response.data);
        setUpdate(true);
      } catch (error) {
        console.error(error);
        toast("Borrow could not be Fetched", {
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

  // const handleAlert = (alertM) => {
  //   setAlertMessage(alertM);
  //   setAlert(true);
  //   setTimeout(() => {
  //     setAlert(false);
  //   }, 3000);
  // };

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
      toast("Borrow could not be Added", {
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
      toast("Borrow could not be Deleted", {
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

  const handleUpdateForm = (borrow) => {
    setUpdateBorrow(borrow);
  };

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
      toast("Borrow could not be Updated", {
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
        New Book Borrow
      </Typography>
      <div className="post">
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

      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Update Book Borrow
      </Typography>
      <div className="post">
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
      <Typography variant="h3" align="center" gutterBottom>
        Books
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableHeader initial={initialBorrow} />
          </TableHead>
          <TableBody>
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
  );
}
