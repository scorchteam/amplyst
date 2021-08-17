export default class Universe {
    constructor(generation = 0, liveCells = new Map()) {
      this.generation = generation;
      this.liveCells = liveCells;
      this.nextGeneration = new Map();
      this.deadCells = new Map();
    }
  
    getGeneration() {
      return this.generation;
    }
  
    getLiveCells() {
      return this.liveCells;
    }
  
    addCell(position) {
      this.liveCells.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }
  
    removeCell(position) {
      this.liveCells.delete(position);
    }
  
    isCellAlive(position) {
      return this.liveCells.has(position);
    }
  
    storeCell(position) {
      if(this.isCellAlive(position.x + " , " + position.y)) {
        this.removeCell(position.x + " , " + position.y);
      } else {
        this.addCell(position);
      }
  
      return new Universe(this.generation, this.liveCells);
    }
  
    addGeneration(){
      this.liveCells.forEach((item) => {
        this.calculateLiveCellsNeighboors(item);
      })
  
      this.deadCells.forEach((item) => {
        this.calculateDeadCellsNeighboors(item);
      })
  
      this.generation++;
  
      return new Universe(this.generation, this.nextGeneration)
    }
  
    calculateLiveCellsNeighboors(position) {
      var liveNeighboors = 0;
  
      for(var i = position.x - 1; i <= position.x + 1; i++){
        for(var j = position.y - 1; j <= position.y + 1; j++){
          
          if(i === position.x && j === position.y)
            continue;
  
          if(this.isCellAlive(i + " , " + j)){
              liveNeighboors++;
          } else {
            this.deadCells.set(i + " , " +j, {x: i, y: j})
          }
        }
      }
  
      if((liveNeighboors === 2 || liveNeighboors === 3))
        this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }
  
    calculateDeadCellsNeighboors(position) {
      var liveNeighboors = 0;
  
      for(var i = position.x - 1; i <= position.x + 1; i++){
        for(var j = position.y - 1; j <= position.y + 1; j++){
  
          if(i === position.x && j === position.y)
            continue;
  
          if(this.isCellAlive(i + " , " + j)){
              liveNeighboors++;
            }
          }
        }
  
      if(liveNeighboors === 3)
        this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }
  
  }