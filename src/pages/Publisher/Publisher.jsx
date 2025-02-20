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

const initialPublisher = {
  name: "",
  establishmentYear: "",
  address: "",
};

const BaseUrl = "http://localhost:8080";

export default function Publisher() {
  const [newPublisher, setNewPublisher] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [updatePublisher, setUpdatePublisher] = useState(initialPublisher);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
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

    getPublishers();
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
      await axios.post(BaseUrl + "/api/v1/publishers", newPublisher);
      setUpdate(false);
      setNewPublisher(initialPublisher);
      handleAlert("Publisher Added");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(BaseUrl + "/api/v1/publishers/" + id);
      setUpdate(false);
      handleAlert("Publisher Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateForm = (publisher) => {
    setUpdatePublisher(publisher);
  };

  const handleUpdatePublisher = async () => {
    try {
      await axios.put(
        BaseUrl + "/api/v1/publishers/" + updatePublisher.id,
        updatePublisher
      );
      setUpdatePublisher(initialPublisher);
      setUpdate(false);
      handleAlert("Publisher Updated");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Publisher
      </Typography>
      <div className="post">
        <InputHandler
          initial={initialPublisher}
          inputState={newPublisher}
          inputStateSetter={setNewPublisher}
        />
        <Button variant="contained" onClick={handlePost}>
          Add Publisher
        </Button>
      </div>
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Update Publisher
      </Typography>
      <div className="post">
        <InputHandler
          initial={initialPublisher}
          inputState={updatePublisher}
          inputStateSetter={setUpdatePublisher}
        />
        <Button variant="contained" onClick={handleUpdatePublisher}>
          Update Publisher
        </Button>
      </div>

      <Typography variant="h3" align="center" gutterBottom>
        Publisher
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableHeader initial={initialPublisher} />
          </TableHead>
          <TableBody>
            {publishers?.map((publisher) => (
              <TableRow key={publisher.id}>
                <TableCell align="center">{publisher.name}</TableCell>
                <TableCell align="center">
                  {publisher.establishmentYear}
                </TableCell>
                <TableCell align="center">{publisher.address}</TableCell>
                <TableCell align="center">
                  <DeleteIcon onClick={() => handleDelete(publisher.id)} />
                </TableCell>
                <TableCell align="center">
                  <EditIcon onClick={() => handleUpdateForm(publisher)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {alert && <Typography variant="h6">{alertMessage}</Typography>}
    </div>
  );
}
