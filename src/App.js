import { Route, Switch } from "react-router-dom";
import StreamView from "./pages/StreamView";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ViewStream from "./pages/ViewStream.jsx";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const authentication = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="rootFlex">
        <NavBar />
        <div className="rootContainer">
          <Switch>
            <Route path="/stream" component={StreamView} />
            <Route path="/viewStream" component={ViewStream} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
        <Login />
      </div>
    </QueryClientProvider>
  );
}

export default App;
