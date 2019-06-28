import React from 'react';
import './App.css';

import StartPage from "./components/Startpage";
import Game from "./components/Game";
import EnterName from "./components/EnterName";

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      currentPage: "startpage",
      difficulty: 2,
    }
  }

  changeCurrentPage = (newPage) => 
  {
    this.setState({currentPage: newPage});
  }


  render() {

    if (this.state.currentPage === "startpage")
      return <StartPage changeCurrentPage = {this.changeCurrentPage}/>
    else if (this.state.currentPage === "entername") {
      return <EnterName changeCurrentPage = {this.changeCurrentPage}/>
    }
    else if (this.state.currentPage === "game") {
      return <Game/>
    }
      

  }
}

export default App;