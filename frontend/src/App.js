import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContextProvider from "./contexts/Context";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='' component={Home} />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
}
export default App;
