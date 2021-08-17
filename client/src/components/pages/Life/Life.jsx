import React, { Component } from 'react';
import './Life.scss';
import Universe from './Universe';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      universe: new Universe(),
      size: this.calculateSize(),
      gameRunning: false,
      interval: 50,
      initialPass: true,
      title: "Welcome to Life.",
      subtitle: "Click anywhere to start",
      backCss: "this-is-life-back"
    }

    console.log(this.state)

    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.storeCell = this.storeCell.bind(this);
    
  }

  calculateSize() {
      const width = Math.floor(window.innerWidth / 20);
      const height = Math.floor(window.innerHeight / 20);

      return [width, height];
  }

//   componentDidMount() {
//       this.initialRenderBoard();
//   }

  handleRowChange(event) {
    if(!this.state.gameRunning) {
      var actualSize = this.state.size;

      if(event.target.value < 20)
        actualSize[1] = event.target.value;
      else
        actualSize[1] = 20;

      this.setState({
        size: actualSize,
      });

      this.renderBoard();
    }
  }

  handleColumnChange(event) {
    if(!this.state.gameRunning) {
      var actualSize = this.state.size;
      if(event.target.value < 90)
        actualSize[0] = event.target.value;
      else
        actualSize[0] = 90;

      this.setState({
        size: actualSize,
      });

      this.renderBoard();
    }
  }

  changeInterval = (event) => {
    if(!this.state.gameRunning){
      this.setState({
        interval: event.target.value
      })
    }
  }

  startGame() {
    this.setState({
        title: "",
        subtitle: "",
        backCss: ""
    })
    if(!this.state.gameRunning){
        this.initialRenderBoard();
      this.setState({
        gameRunning: true,
      }, () => {
        this.intervalRef = setInterval(() => this.runGame(), this.state.interval);
      })
    } else {
        this.setState({
            gameRunning: false,
            title: "Click again to restart",
            backCss: "this-is-life-back"
          }, () => {
            if(this.intervalRef) {
              clearInterval(this.intervalRef);
            }
        })
    }
  }

  stopGame(){
    this.setState({
      gameRunning: false
    }, () => {
      if(this.intervalRef) {
        clearInterval(this.intervalRef);
      }
    })
  }

  runGame() {
    this.setState({
      universe: this.state.universe.addGeneration()
    })
  }

  storeCell(position) {
    if(!this.state.gameRunning) {
      this.setState({
        universe: this.state.universe.storeCell(position)
      })
    }
  }

  renderBoard() {
    var newWorld = [];
    var cellRow = [];

    for(var i = 0; i < this.state.size[0]; i++) {
        for (var j = 0; j < this.state.size[1]; j++){
            if(this.state.universe.isCellAlive(i + " , " + j)){
            cellRow.push(
                <Cell key={[i, j]} position={{x: i, y: j}} live={true} storeCell={this.storeCell.bind(this)}/>
            );
            } else {
            cellRow.push(
                <Cell key={[i, j]} position={{x: i, y: j}} live={false} storeCell={this.storeCell.bind(this)}/>
            );
            }
        }
        newWorld.push(<div className="row-fefewfwe" key={i}>{cellRow}</div>);
        cellRow = [];
    }
    return newWorld;
  }

  initialRenderBoard() {
    for(var i = 0; i < this.state.size[0]; i++) {
        for (var j = 0; j < this.state.size[1]; j++){
            if(Math.random() < 0.5) {
                this.storeCell({
                    x: i,
                    y: j
                })
            }
        }   
    }
  }

  render() {
    return (
    <div className="body">
        <div className="worldContainer" onClick={this.startGame}>
        <div className="this-is-life">
            <div className={this.state.backCss}>
                <h3>
                {this.state.title}
                </h3>
                <h6>
                {this.state.subtitle}
                </h6>
            </div>
        </div>
        <div className="boardContainer">
        {this.renderBoard()}
        </div>
      </div>
    </div>
      
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "cellContainerLive" : "cellContainerDead"}></div>
    );
  }
}