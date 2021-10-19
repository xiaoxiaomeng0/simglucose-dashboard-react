import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Components/header/header";
import HomePage from "./Pages/homepage/homepage";
import { SimulationPage } from "./Pages/SimulationPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/simulate" component={SimulationPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
