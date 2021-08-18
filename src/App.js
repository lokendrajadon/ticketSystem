import React from "react";
import Register from "./Screens/Auth/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Screens/Auth/Login";
import Home from "./Screens/Home/Home";
import Header from "./Header";
import Footer from "./Footer";
import Ticket from "./Screens/Ticket/Ticket";
import { ErrorPage } from "./Screens/ErrorPage";
const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/login" component={Login} exact></Route>
        <Route path="/tickets" component={Ticket} />
        <Route path="/" component={Home} exact></Route>
        <Route path="*" component={ErrorPage} ></Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
