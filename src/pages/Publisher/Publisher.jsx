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

// Initial state for a new publisher
const initialPublisher = {
  name: "",
  establishmentYear: "",
  address: "",
};

// Base URL for the API
//const BaseUrl = "http://localhost:8080";
const BaseUrl = import.meta.env.VITE_BASE_URL;

export default function Publisher() {
  // State variables
  const [newPublisher, setNewPublisher] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [updatePublisher, setUpdatePublisher] = useState(initialPublisher);
  const [update, setUpdate] = useState(false);

  // Fetch publishers from the API when the component mounts or when 'update' changes
  useEffect(() => {
    const getPublishers = async () => {
      try {
        const response = await axios.get(BaseUrl + "/api/v1/publishers");
        setPublishers(response.data);
        console.log(response.data);
        setUpdate(true);
      } catch (error) {
        console.error(error);
        toast.error("Publisher could not be Fetched", {
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

    getPublishers();
  }, [update]);

  // Post a new publisher to the API
  const handlePost = async () => {
    try {
      await axios.post(BaseUrl + "/api/v1/publishers", newPublisher);
      setUpdate(false);
      setNewPublisher(initialPublisher);
      //handleAlert("Publisher Added");
      toast("Publisher Added", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
      });
    } catch (error) {
      console.error(error);
      toast.error("Publisher could not be Added", {
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

  // Delete a publisher from the API
  const handleDelete = async (id) => {
    try {
      await axios.delete(BaseUrl + "/api/v1/publishers/" + id);
      setUpdate(false);
      //handleAlert("Publisher Deleted");
      toast("Publisher Deleted", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
      });
    } catch (error) {
      toast.error("Publisher could not be Deleted ", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
      });
      console.error(error);
    }
  };

  // Handle setting the form for updating a publisher
  const handleUpdateForm = (publisher) => {
    setUpdatePublisher(publisher);
  };

  // Update a publisher in the API
  const handleUpdatePublisher = async () => {
    try {
      await axios.put(
        BaseUrl + "/api/v1/publishers/" + updatePublisher.id,
        updatePublisher
      );
      setUpdatePublisher(initialPublisher);
      setUpdate(false);
      //handleAlert("Publisher Updated");
      toast("Publisher Updated", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressx: undefined,
      });
    } catch (error) {
      console.error(error);
      toast.error("Publisher could not be Updated", {
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
    <div className="page">
      <div className="page-container">
        <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
          New Publisher
        </Typography>
        <div className="post">
          {/* Input fields for adding a new publisher */}
          <InputHandler
            initial={initialPublisher}
            inputState={newPublisher}
            inputStateSetter={setNewPublisher}
          />
          <Button variant="contained" onClick={handlePost}>
            Add Publisher
          </Button>
        </div>
      </div>
      <div className="page-container">
        <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
          Update Publisher
        </Typography>
        <div className="post">
          {/* Input fields for updating an existing publisher */}
          <InputHandler
            initial={initialPublisher}
            inputState={updatePublisher}
            inputStateSetter={setUpdatePublisher}
          />
          <Button variant="contained" onClick={handleUpdatePublisher}>
            Update Publisher
          </Button>
        </div>
      </div>

      <div className="page-table">
        <Typography variant="h3" align="center" gutterBottom>
          Publisher
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {/* Table header */}
              <TableHeader initial={initialPublisher} />
            </TableHead>
            <TableBody>
              {/* Table rows for displaying publishers */}
              {publishers?.map((publisher) => (
                <TableRow key={publisher.id}>
                  <TableCell align="center">{publisher.name}</TableCell>
                  <TableCell align="center">
                    {publisher.establishmentYear}
                  </TableCell>
                  <TableCell align="center">{publisher.address}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon onClick={() => handleDelete(publisher.id)} 
                      className="mouse-pointer"/>
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => handleUpdateForm(publisher)} 
                      className="mouse-pointer"/>
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
