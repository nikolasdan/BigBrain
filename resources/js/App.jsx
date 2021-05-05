import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Home from "./routes/Home";
import About from "./routes/About";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Feed from "./routes/Feed";
const App = () => {
    return (
        <Router>
            <Main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/account" component={Profile} />
                    <Route path="/feed" component={Feed}/>
                    <Route component={NotFound} />
                </Switch>
            </Main>
        </Router>
    );
};
export default App;
