import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./InputHandler.css";
function InputHandler({
  initial,
  inputState,
  inputStateSetter,
  author,
  publisher,
  category,
  book,
}) {
  return (
    <div className="input">
      {Object.keys(initial).map((key) => {
        // Render TextField for all keys except 'author', 'publisher', 'categories', and 'book'
        if (key !== "author" && key !== "publisher" && key !== "categories" && key !== "book") {
          return (
            <TextField
              key={key}
              id="standard-basic"
              label={key === "birthDate" ? " " : key && key === "borrowingDate" ? " " : key && key === "returnDate" ? " " : key && key === "book" ? " " : key}  
              variant="standard"
              value={inputState[key]}
              type={key === "birthDate" ? "date" : "text" && key === "borrowingDate" ? "date" : "text" && key === "returnDate" ? "date" : "text"}
              onChange={(e) =>
                inputStateSetter((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          );
        } 
        // Render Select for 'author'
        if (key === "author") {
          console.log("author çalıştı");
          return (
            <div key={key}>
              <InputLabel id="demo-simple-select-label">Author</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={author[key]}
                name={key}
                label="Age"
                onChange={(e) => {
                  
                  inputStateSetter((prev) => ({
                    ...prev,
                    [key]: { id: e.target.value}
                    
                  }));
                }}
              >
                {author?.map((author) => (
                  <MenuItem key={key} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          );
        }
        // Render Select for 'publisher'
        if (key === "publisher") {
          return (
            <div key={key}>
              <InputLabel id="demo-simple-select-label">Publisher</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={author[key]}
                name={key}
                label="Age"
                onChange={(e) => {
                  inputStateSetter((prev) => ({
                    ...prev,
                    [key]: { id: e.target.value },
                  }));
                }}
              >
                {publisher?.map((publisher) => (
                  <MenuItem key={key} value={publisher.id}>
                    {publisher.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          );
        }
        // Render Select for 'categories'
        if (key === "categories") {
          return (
            <div key={key}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={author[key]}
                name={key}
                label="categories"
                onChange={(e) => {
                  inputStateSetter((prev) => ({
                    ...prev,
                    [key]: { id: e.target.value },
                  }));
                }}
              >
                {category?.map((category) => (
                  <MenuItem key={key} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          );
        }
        // Render Select for 'book'
        if(key === "book") {
          return (
            <div key={key}>
              <InputLabel id="demo-simple-select-label">Book</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={author[key]}
                name={key}
                label="Age"
                onChange={(e) => {

                  inputStateSetter((prev) => ({
                    ...prev,
                    ["bookForBorrowingRequest"]: { id: e.target.value },
                  }));

                }}
              >
                {book?.map((book) => (
                  <MenuItem key={key} value={book.id}>
                    {book.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          );
        }
      })}
    </div>
  );
}

export default InputHandler;
