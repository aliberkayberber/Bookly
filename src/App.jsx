import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Book from "./pages/Book/Book";
import Author from "./pages/Author/Author";
import Borrow from "./pages/Borrow/Borrow";
import Category from "./pages/Category/Category";
import Publisher from "./pages/Publisher/Publisher";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    {/* Navbar component */}
      <Navbar />
      {/* Switch component to handle routing */}
      <Switch>
        {/* Route for the home page */}
        <Route path="/" exact>
          <Home />
        </Route>
        {/* Route for the book page */}
        <Route path="/book">
          <Book />
        </Route>
        {/* Route for the author page */}
        <Route path="/author">
          <Author />
        </Route>
        {/* Route for the borrow page */}
        <Route path="/borrow">
          <Borrow />
        </Route>
        {/* Route for the category page */}
        <Route path="/category">
          <Category />
        </Route>
        {/* Route for the publisher page */}
        <Route path="/publisher">
          <Publisher />
        </Route>
      </Switch>
    </>
  );
}

export default App;
