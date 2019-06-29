import React from 'react';

class EnterName extends React.Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
    };
  }

  setPlayerName = (event) => {
    this.setState({ playerName: event.target.value });
  }

  nameEntered = () => {
    if (this.state.playerName !== '')
      this.props.changeCurrentPage("game");
    else alert("Пожалуйста, введите ваше имя.")
  }

  render() {
    return <div id="entername">
      <div>Введите ваше имя</div>
      <input type="text" value={this.state.playerName} onChange={this.setPlayerName}></input>
      <button onClick={this.nameEntered}>Готово!</button>
    </div>
  }
}

export default EnterName;