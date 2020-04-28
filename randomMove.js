function compRandMove()
{
    let available = []; // declare new array to hold coordinates for available spots

    // Loop through the board looking for empty spaces
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            if (board[i][j] == '') // when an empty space is found...
            {
                available.push({i, j}); // add available spot coordinates to 'available' array
            }
        }
    }

    let move = random(available); // select a random set of available coordinates to make a move
    board[move.i][move.j] = ai; // place the comp's move in the new random position
    currentPlayer = human; // after the computer makes a move, set the current player to human
}