import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function TableHeader({ initial }) {
  return (
    <TableRow>
      {/* Render table headers based on the keys of the initial object */}
      {Object.keys(initial).map((key) => (
        <TableCell align="center">{key}</TableCell>
      ))}
      {/* Additional headers for Delete and Edit actions */}
      <TableCell align="center">Delete</TableCell>
      <TableCell align="center">Edit</TableCell>
    </TableRow>
  );
}

export default TableHeader;
