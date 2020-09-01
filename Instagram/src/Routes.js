//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Route, Switch } from "react-router-dom";

//> Components
import { InstagramPage } from "./components/pages";
//#endregion

//#region > Components
/** @class Route component which includes all routes to specified components */
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={(props) => <InstagramPage {...props} />}
        />
      </Switch>
    );
  }
}
//#endregion

//#region > Exports
export default Routes;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
