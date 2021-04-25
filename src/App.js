import { Route, Switch } from "react-router-dom";
import StreamView from "./pages/StreamView";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <div className="rootFlex">
      <NavBar />
      <div className="rootContainer">
        <Switch>
          <Route path="/viewStream" component={StreamView} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
