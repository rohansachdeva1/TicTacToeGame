// Implementation of Tic Tac Toe game with Minimax Algorithm
// By Rohan Sachdeva

let board = [['', '', ''], ['', '', ''], ['', '', '']]; // define a 3x3 playing board
  
let w; // = width / 3;
let h; // = height / 3;
  
let ai = 'X'; // set ai variable to 'X'
let human = 'O'; // set human variable to 'O'
let currentPlayer = human;
            
function setup() 
{
    createCanvas(400, 400);
    w = width / 3;
    h = height / 3;
    compMove();
}
  
function allEqual(a, b, c) 
{
    return a == b && b == c && a != '';
}
  
function checkWinner() 
{
    let winner = null;
  
    // loop down the first column and check rows (horizontal) for winner
    for (let i = 0; i < 3; i++) 
    {
      if (allEqual(board[i][0], board[i][1], board[i][2])) 
      {
        winner = board[i][0]; // set winner variable to base value
      }
    }
  
    // loop across first row and check columns (vertical) for winner
    for (let i = 0; i < 3; i++) 
    {
      if (allEqual(board[0][i], board[1][i], board[2][i])) 
      {
        winner = board[0][i]; // set winner variable to base value
      }
    }
  
    // check top left to bottom right diagonal for winner
    if (allEqual(board[0][0], board[1][1], board[2][2])) 
    {
      winner = board[0][0]; // set winner variable to base value
    }
    // check top right to bottom left diagonal for winner
    if (allEqual(board[2][0], board[1][1], board[0][2])) 
    {
      winner = board[2][0]; // set winner variable to base value
    }
    
    // count the amount of open spots on the board
    let openSpots = 0; // open spots counter variable
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        if (board[i][j] == '') 
        {
          openSpots++;
        }
      }
    }
    
    // if there is no winner found and no more open spots to make a move, return a tie
    if (winner == null && openSpots == 0) 
    {
      return 'tie';
    } 
    else // executes if a winner is found, return that winner
    {
      return winner;
    }
}

// userMove function takes user input from the mouse click for the human move
function userMove() 
{
    if (currentPlayer == human) // executes only if it is the user's turn
    {
      // Human make turn
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      // If valid turn
      if (board[i][j] == '') 
      {
        board[i][j] = human; // places the user's move on the spot in the board
        currentPlayer = ai; // once the user has gone, sets the current player to the computer
        compMove(); // executes the minimax algorithm as the computer's move
      }
    }
}

// draw the board and define the game
function draw() 
{
    background(255); // set the background to white
    strokeWeight(4); // set stroke weight of all drawings to 4
  
    // two horizontal and two vertical lines to create the 3x3 tictactoe board
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
  
    // loop through the board and draw it depending on it's values
    for (let j = 0; j < 3; j++) 
    {
      for (let i = 0; i < 3; i++) 
      {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j]; // add a spot to each place in the two dimensional array
        textSize(32);
        let r = w / 4;
        if (spot == human) // draw the O using an elipse to represent the user's move
        {
          noFill();
          ellipse(x, y, r * 2);
        } 
        else if (spot == ai) // draw the X using two diagonal lines to represent the comp's move
        {
          line(x - r, y - r, x + r, y + r);
          line(x + r, y - r, x - r, y + r);
        }
      }
    }
    
    let result = checkWinner();

    // if there is a winner, end the game and return an end game statement, either declaring a win or tie
    if (result != null) 
    {
      noLoop(); // stop the current game
      let resultP = createP(''); // variable to hold the end game statement
      resultP.style('font-size', '32pt');

      // depending on the value in result, declare a win or tie
      if (result == 'tie') 
      {
        resultP.html('Tie!');
      } else {
        resultP.html(`${result} wins!`);
      }
    }
}