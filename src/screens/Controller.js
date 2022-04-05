import React from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";

const Controller = () => {
  const baseUrl = "/";
  const movieDetailsUrl = "movie-details/:id";
  const bookShowUrl = "/bookshow/:id";

  return (
    <Router>
      <div className="main-container">
        <Route path="/" exact component={Home} />
        <Route path="/movie-details/:id" component={Details} />
        <Route path="/book-show/:id" component={BookShow} />
        
        {/* <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />  */}
      </div>
    </Router>
  );
};

export default Controller;
