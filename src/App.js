import {Route, Switch} from 'react-router-dom'
import StreamView from './pages/StreamView'


function App() {
  return (
    <Switch>
      <Route path='/viewStream' component={StreamView} />
    </Switch>
  );
}

export default App;
