import React from 'react';

class StartPage extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  readyToGame = () => {
    this.props.changeCurrentPage("entername");
  }

  render() {
    var menu =
      <div id="startpage">
        <div onClick={this.readyToGame}>Начать игру</div>
      </div>
    return menu;
  }
}

export default StartPage;