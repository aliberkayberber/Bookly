import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function TableHeader({ initial }) {
  return (
    <TableRow>
      {Object.keys(initial).map((key) => (
        <TableCell align="center">{key}</TableCell>
      ))}
      <TableCell align="center">Delete</TableCell>
      <TableCell align="center">Edit</TableCell>
    </TableRow>
  );
}

export default TableHeader;
