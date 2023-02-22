import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandiPage from './componentes/LandiPage';
import Home from './componentes/Home';
import CreateRecipe from "./componentes/CreateRecipe"
//* <switch> el swit en caso que tiene un link que no existe elije el ultimo, osea machea los link qu correponda */}

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch> 
        <Route exact path="/" component={LandiPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exac path="/create" component={CreateRecipe}/>
    </Switch>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
