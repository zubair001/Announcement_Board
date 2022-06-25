import React from "react";
import { Route,Switch } from "react-router-dom";
import Posts from "./components/posts";
const Routes= ()=> {
    return (
        <div>
            <Switch>
            <Route path="/">
                     <Posts />
                </Route>
            </Switch>
        </div>
    )
}

export default Routes;