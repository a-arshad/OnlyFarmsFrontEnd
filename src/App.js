import './App.css';
import React from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";
import HomeView from "./components/HomeView";
import ConsumerView from "./components/ConsumerView";
import StoreView from "./components/StoreView";


function App() {
  return (
    <HashRouter>
      <div className="App">
        <div className="content">
          <Route exact path="/" component={HomeView}/>
          <Route path="/consumer" component={ConsumerView}/>
          <Route path="/store" component={StoreView}/>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
