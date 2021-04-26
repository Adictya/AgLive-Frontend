import { Route, Switch } from "react-router-dom";
import StreamView from "./pages/StreamView";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="rootFlex">
        <NavBar />
        <div className="rootContainer">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/viewStream" component={StreamView} />
          </Switch>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
