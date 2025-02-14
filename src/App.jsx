import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Book from "./pages/Book/Book";
import Author from "./pages/Author/Author";
import Borrow from "./pages/Borrow/Borrow";
import Category from "./pages/Category/Category";
import Publisher from "./pages/Publisher/Publisher";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/book">
          <Book />
        </Route>
        <Route path="/author">
          <Author />
        </Route>
        <Route path="/borrow">
          <Borrow />
        </Route>
        <Route path="/category">
          <Category />
        </Route>
        <Route path="/publisher">
          <Publisher />
        </Route>
      </Switch> 
    </>
  );
}

export default App;
