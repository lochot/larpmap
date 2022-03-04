window.addEventListener('load', () => {

    WA.onInit().then(() => {
        WA.controls.disablePlayerControls();
        let state = true;
        WA.chat.sendChatMessage('Veuillez patienter pendant la generation du labyrinthe...', 'Aide');
        let Maze = new MazeBuilder(30, 30);
                Maze.placeKey();
                Maze.display("maze_container");
        var tid = setInterval(altLayer,2000);
        function altLayer(){
            if(state) {
                WA.room.setProperty('piques1', 'exitUrl', undefined);
                WA.room.hideLayer('piques1');
            } else {
                WA.room.showLayer('piques1');
                WA.room.setProperty('piques1', 'exitUrl', 'automaze.json#start');
            }
            state = !state;
        }
        WA.player.onPlayerMove(function(e){
            let x = Math.round(e.x/32);
            let y = Math.round(e.y/32);
            let tiled = [
                
                ];
                /*for(let i = 3; i < 5; i++) {
                    for(let j = 0; j <= i; j++) {    
                        tiled.push(
                                {x: x + i, y: y + j, tile: 'black', layer: 'black'},
                                {x: x - i, y: y + j, tile: 'black', layer: 'black'},
                                {x: x + i, y: y - j, tile: 'black', layer: 'black'},
                                {x: x - i, y: y - j, tile: 'black', layer: 'black'},
                                {x: x + j, y: y + i, tile: 'black', layer: 'black'},
                                {x: x + j, y: y - i, tile: 'black', layer: 'black'},
                                {x: x - j, y: y + i, tile: 'black', layer: 'black'},
                                {x: x - j, y: y - i, tile: 'black', layer: 'black'}
                        );
                    }
                }*/
                tiled.push(
                        {x: x,     y: y,     tile: null, layer: 'black'},
                        {x: x + 1, y: y,     tile: null, layer: 'black'},
                        {x: x - 1, y: y,     tile: null, layer: 'black'},
                        {x: x,     y: y + 1, tile: null, layer: 'black'},
                        {x: x,     y: y - 1, tile: null, layer: 'black'},
                        {x: x + 1, y: y + 1, tile: null, layer: 'black'},
                        {x: x + 1, y: y - 1, tile: null, layer: 'black'},
                        {x: x - 1, y: y + 1, tile: null, layer: 'black'},
                        {x: x - 1, y: y - 1, tile: null, layer: 'black'},
                        {x: x + 2, y: y,     tile: null, layer: 'black'},
                        {x: x - 2, y: y,     tile: null, layer: 'black'},
                        {x: x,     y: y + 2, tile: null, layer: 'black'},
                        {x: x,     y: y - 2, tile: null, layer: 'black'}
                        
                        );
                WA.room.setTiles(tiled);
        });    
    });
});

class MazeBuilder {

    constructor(width, height) {
  
      this.width = width;
      this.height = height;
  
      this.cols = 2 * this.width + 1;
      this.rows = 2 * this.height + 1;
  
      this.maze = this.initArray([]);
      this.tiled = [];
      this.entrancex = 1;
      this.entrancey = 1;
      // place initial walls
      this.maze.forEach((row, r) => {
        row.forEach((cell, c) => {
          switch(r)
          {
            case 0:
            case this.rows - 1:
              this.maze[r][c] = ["wall"];
              break;
  
            default:
              if((r % 2) == 1) {
                if((c == 0) || (c == this.cols - 1)) {
                  this.maze[r][c] = ["wall"];
                }
              } else if(c % 2 == 0) {
                this.maze[r][c] = ["wall"];
              }
  
          }
        });
  
        if(r == 0) {
            // place exit in top row
            let doorPos = this.posToSpace(this.rand(1, this.width));
            this.maze[r][doorPos] = ["door", "exit"];
          }
    
          if(r == this.rows - 1) {
            // place entrance in bottom row
            let doorPos = this.posToSpace(this.rand(1, this.width));
            this.maze[r][doorPos] = ["door", "entrance"];
            //this.maze[1][1] = ["door", "entrance"];
          }
  
      });
  
      // start partitioning
      this.partition(1, this.height - 1, 1, this.width - 1);
    }
  
    initArray(value) {
      return new Array(this.rows).fill().map(() => new Array(this.cols).fill(value));
    }
  
    rand(min, max) {
      return min + Math.floor(Math.random() * (1 + max - min));
    }
  
    posToSpace(x) {
      return 2 * (x-1) + 1;
    }
  
    posToWall(x) {
      return 2 * x;
    }
  
    inBounds(r, c) {
      if((typeof this.maze[r] == "undefined") || (typeof this.maze[r][c] == "undefined")) {
        return false; // out of bounds
      }
      return true;
    }
  
    shuffle(array) {
      // sauce: https://stackoverflow.com/a/12646864
      for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    partition(r1, r2, c1, c2) {
      // create partition walls
      // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
  
      let horiz, vert, x, y, start, end;
  
      if((r2 < r1) || (c2 < c1)) {
        return false;
      }
  
      if(r1 == r2) {
        horiz = r1;
      } else {
        x = r1+1;
        y = r2-1;
        start = Math.round(x + (y-x) / 4);
        end = Math.round(x + 3*(y-x) / 4);
        horiz = this.rand(start, end);
      }
  
      if(c1 == c2) {
        vert = c1;
      } else {
        x = c1 + 1;
        y = c2 - 1;
        start = Math.round(x + (y - x) / 3);
        end = Math.round(x + 2 * (y - x) / 3);
        vert = this.rand(start, end);
      }
  
      for(let i = this.posToWall(r1)-1; i <= this.posToWall(r2)+1; i++) {
        for(let j = this.posToWall(c1)-1; j <= this.posToWall(c2)+1; j++) {
          if((i == this.posToWall(horiz)) || (j == this.posToWall(vert))) {
            this.maze[i][j] = ["wall"];
          }
        }
      }
  
      let gaps = this.shuffle([true, true, true, false]);
  
      // create gaps in partition walls
  
      if(gaps[0]) {
        let gapPosition = this.rand(c1, vert);
        this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
      }
  
      if(gaps[1]) {
        let gapPosition = this.rand(vert+1, c2+1);
        this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
      }
  
      if(gaps[2]) {
        let gapPosition = this.rand(r1, horiz);
        this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = [];
      }
  
      if(gaps[3]) {
        let gapPosition = this.rand(horiz+1, r2+1);
        this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = [];
      }
  
      // recursively partition newly created chambers
  
      this.partition(r1, horiz-1, c1, vert-1);
      this.partition(horiz+1, r2, c1, vert-1);
      this.partition(r1, horiz-1, vert+1, c2);
      this.partition(horiz+1, r2, vert+1, c2);
  
    }
  
    isGap(...cells) {
      return cells.every((array) => {
        let row, col;
        [row, col] = array;
        if(this.maze[row][col].length > 0) {
          if(!this.maze[row][col].includes("door")) {
            return false;
          }
        }
        return true;
      });
    }
  
    countSteps(array, r, c, val, stop) {
  
      if(!this.inBounds(r, c)) {
        return false; // out of bounds
      }
  
      if(array[r][c] <= val) {
        return false; // shorter route already mapped
      }
  
      if(!this.isGap([r, c])) {
        return false; // not traversable
      }
  
      array[r][c] = val;
  
      if(this.maze[r][c].includes(stop)) {
        return true; // reached destination
      }
  
      this.countSteps(array, r-1, c, val+1, stop);
      this.countSteps(array, r, c+1, val+1, stop);
      this.countSteps(array, r+1, c, val+1, stop);
      this.countSteps(array, r, c-1, val+1, stop);
  
    }
  
    getKeyLocation() {
  
      let fromEntrance = this.initArray();
      let fromExit = this.initArray();
  
      this.totalSteps = -1;
  
      for(let j = 1; j < this.cols-1; j++) {
        if(this.maze[this.rows-1][j].includes("entrance")) {
          this.countSteps(fromEntrance, this.rows-1, j, 0, "exit");
        }
        if(this.maze[0][j].includes("exit")) {
          this.countSteps(fromExit, 0, j, 0, "entrance");
        }
      }
  
      let fc = -1, fr = -1;
  
      this.maze.forEach((row, r) => {
        row.forEach((cell, c) => {
          if(typeof fromEntrance[r][c] == "undefined") {
            return;
          }
          let stepCount = fromEntrance[r][c] + fromExit[r][c];
          if(stepCount > this.totalSteps) {
            fr = r;
            fc = c;
            this.totalSteps = stepCount;
          }
        });
      });
  
      return [fr, fc];
    }
  
    placeKey() {
  
      let fr, fc;
      [fr, fc] = this.getKeyLocation();
  
      this.maze[fr][fc] = ["key"];
  
    }
  
    display(id) {
      
      this.maze.forEach((row,index) => {
        //console.log(index);
        let curx = index + 2;
        row.forEach((cell,index) => {
            let cury = index;
            //console.log('x : '+curx+' y : '+cury);
            //si valeur
          if(cell) {
              //check de la valeur
              if(cell == "wall") //un mur on met une tuile mur
                {
                    /*this.tiled.push(
                        {x: curx, y: cury, tile: 'monmur', layer: 'murs'}
                        );
                        WA.room.setTiles([
                            this.tiled
                        ]);*/
                    WA.room.setTiles([
                        {x: curx, y: cury, tile: 'monmur', layer: 'murs'}
                    ]);
                    //cellDiv.className = cell.join(" ");
                } else {
                    console.log('x : '+curx+' y : '+cury);
                    console.log(cell[1]);
                    if(cell[1] == 'entrance'){
                        this.entrancex = curx;
                        this.entrancey = cury;
                    }
                }
          }

        });

      }); 
      WA.chat.sendChatMessage('le labyrinthe est prêt !', 'Aide');
      //WA.player.moveTo(this.entrancex, this.entrancey, 10);
      WA.controls.restorePlayerControls();
      return true;
    }
  
  }
  