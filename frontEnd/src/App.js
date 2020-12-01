import React from "react";
import {BrowserRouter,Switch,Route}from "react-router-dom";
import Editor from "./components/Editor/Editor";
import Chat from "./components/Chat/Chat";
import 'bootstrap/dist/css/bootstrap.min.css'
function App(){

return(
    <BrowserRouter>
    <Switch>
    <Route path="/chat" component={Chat}/>
    <Route path="/editor" component={Editor}/>
    </Switch>
    </BrowserRouter>
)

}
export default App;