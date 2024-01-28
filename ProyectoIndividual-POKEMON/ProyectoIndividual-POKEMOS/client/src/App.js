import { Route, BrowserRouter, Switch } from "react-router-dom";

import Create from "./views/create/create.component";
import Detail from "./views/detail/detail.component";
import Home from "./views/home/home.component";
import Landing from "./views/landing/landing.component";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/pokemons" component={Home} />
          <Route path="/pokemon/:id" component={Detail} />
          <Route path="/create" component={Create} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
