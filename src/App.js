import React from "react";
import Info from './Containers/Info.js';
import GuardedRoute from './helpers/GuardedRoute.js';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container form-wrapper">
        <div className="col-md-6 row offset-md-3">
          <h1 className="form-header">Test app</h1>
        </div>
        <div className="col-md-6 row offset-md-3">
        <Switch>
          <GuardedRoute 
            path='/info'
            component={Info}
          /> 
          <Route path='/' exact>
            <a href="https://oauth.vk.com/authorize?client_id=7565584&display=page&redirect_uri=http://localhost:3000/info&scope=photos&response_type=token&v=5.122&state=123456" className="btn btn-primary">
              Login
            </a>
          </Route>
        </Switch>
        </div>
      </div>
    </Router> 
  );
}

export default App;
