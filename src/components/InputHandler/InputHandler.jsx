import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function InputHandler({
  initial,
  inputState,
  inputStateSetter,
  author,
  publisher,
  category,
}) {
  return (
    <div>
      {Object.keys(initial).map((key) => {
        if (key !== "author" && key !== "publisher" && key !== "categories") {
          return (
            <TextField
              key={key}
              id="standard-basic"
              label={key === "birthDate" ? " " : key}
              variant="standard"
              value={inputState[key]}
              type={key === "birthDate" ? "date" : "text"}
              onChange={(e) =>
                inputStateSetter((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          );
        } if (key === "author") {
          console.log("burası çalıştı");
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
        if (key === "publisher") {
          console.log("burası çalıştı");
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
        if (key === "categories") {
          console.log("burası çalıştı");
          return (
            <div key={key}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
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
                {category?.map((category) => (
                  <MenuItem key={key} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          );
        }

        // <TextField
        //   key={key}
        //   id="standard-basic"
        //   label={key === "birthDate" ? " " : key}
        //   variant="standard"
        //   value={inputState[key]}
        //   type={key === "birthDate" ? "date" : "text"}
        //   onChange={(e) =>
        //     inputStateSetter((prev) => ({ ...prev, [key]: e.target.value }))
        //   }
        // />;
      })}
    </div>
  );
}

export default InputHandler;
