var gameOfLife = {
  width: 20,
  height: 20,
  stepInterval: null,
  looper: null,

  getCol: function (cell) {
    return parseInt(cell.id.split('-')[0], 10);
  },
  getRow: function (cell) {
    return parseInt(cell.id.split('-')[1], 10);
  },

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement('tbody');

    // build Table HTML
    var tablehtml = '';
    for (var ht = 0; ht < this.height; ht++) {
      tablehtml += "<tr id='row+" + ht + "'>";
      for (var wd = 0; wd < this.width; wd++) {
        tablehtml += "<td data-status='dead' class='dead' id='" + wd + '-' + ht + "'></td>";
      }
      tablehtml += '</tr>';
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);

    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /*
     Write forEachCell here. You will have to visit
     each cell on the board, call the "iteratorFunc" function,
     and pass into func, the cell and the cell's x & y
     coordinates. For example: iteratorFunc(cell, x, y)
     */

    var cells = document.getElementById('board').getElementsByTagName('td');
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      iteratorFunc(cell, this.getCol(cell), this.getRow(cell));
    }

  },

  setupBoardEvents: function () {
    // each board cell has an CSS id in the format of: "x-y"
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"

    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white

    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board

    var onCellClick = function () {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?

      // how to set the style of the cell when it's clicked
      if (this.getAttribute('data-status') === 'dead') {
        this.className = 'alive';
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = 'dead';
        this.setAttribute('data-status', 'dead');
      }
    };

    this.forEachCell(function (cell) {
      cell.onclick = onCellClick;
    })

//   var cell00 = document.getElementById('0-0');
//    cell00.onclick = onCellClick;
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game.
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors
    var self = this;
    console.log('Entering step');
    this.forEachCell(function (cell) {
      var neighbors = self.countNeighbors(cell);

      if (cell.getAttribute('data-status') === 'dead') {
        if (neighbors === 3) {
          cell.setAttribute('data-next-status', 'alive');
        } else {
          cell.setAttribute('data-next-status', 'dead');
        }
      } else if (neighbors === 2 || neighbors === 3) {
          cell.setAttribute('data-next-status', 'alive');
        } else {
          cell.setAttribute('data-next-status', 'dead');
        }
    });
    this.forEachCell(function (cell) {
      var nextStatus = cell.getAttribute('data-next-status');
      // Refactor: Extract common code from here and cell click event
      cell.className = nextStatus;
      cell.setAttribute('data-status', nextStatus);
    })
  },
  close: function() {
  const {remote} = require('electron');
  const {BrowserWindow} = remote;
  const win = BrowserWindow.getFocusedWindow();
  win.close();
  },
  countNeighbors: function (cell) {
    var count = 0;
    var tc = this.getCol(cell);
    var tr = this.getRow(cell);
    for (var col = tc - 1; col <= tc + 1; col++) {
      for (var row = tr - 1; row <= tr + 1; row++) {
        if (row !== tr || col !== tc) {
          var neighbor = document.getElementById(col + '-' + row);
          if (neighbor !== null && neighbor.getAttribute('data-status') === 'alive') {
            count++
          }
        }
      }
    }
    return count;
  },
  enableAutoPlay: function () {
    var node = document.getElementById('play_btn');
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
    if (this.looper === null) {
      this.looper = setInterval(this.step.bind(this), 500);
      node.innerText = 'Stop';
    } else {
      clearInterval(this.looper);
      this.looper = null;
      node.innerText = 'Play';
    }
  },

  clear: function (random) {
    this.forEachCell(function (cell) {
      if (!random  || Math.random() <= 0.5) {
        cell.className = 'dead';
        cell.setAttribute('data-status', 'dead');
      } else {
        cell.className = 'alive';
        cell.setAttribute('data-status', 'alive');
      }
    });
  }
};


 //  gameOfLife.createAndShowBoard(false);
 // // gameOfLife.forEachCell(function (cell,  row, col) {
 // //   console.log(cell.id, row, col);
 //  gameOfLife.setupBoardEvents();
module.exports = gameOfLife;
