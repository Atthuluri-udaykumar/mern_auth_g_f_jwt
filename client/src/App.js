import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Dashbord from './components/Dashbord';
import Signin from "./components/Signin"
import SignUp from "./components/SignUp"
import { Provider } from "react-redux"
import { store } from "./Store"
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/dashbord" component={Dashbord} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
