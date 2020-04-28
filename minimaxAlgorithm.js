function compMove() 
{
    let bestScore = -Infinty; // initialize bestScore to -infinity so that there will always be a valid score
    let move; // variable to keep track of where the comp should make a move

    // Loop through the board looking for empty spaces
    for (let i = 0; i < 3; i++) 
    {
        for (let j = 0; j < 3; j++) 
        {
            if (board[i][j] == '') // when an empty space is found...
            { 
                board[i][j] = ai; // in the empty space, place the ai character and recursively call the minimax algorithm on that spot
                let score = minimax(board, 0, false); // set score equal to the score if the comp made a move in that position
                board[i][j] = ''; // remove the ai character from the spot after the minimax algorithm has run
                if (score > bestScore) // if that score is greater than the best score ...
                {
                    bestScore = score; // set that move as the best score
                    move = {i, j}; // change the comp move to that position since it is the best so far
                }
            }
        }
    }

    board[move.i][move.j] = ai; // place the comp's move in the new best position
    currentPlayer = human; // after the computer makes a move, set the current player to human
}

let scores = {X: 1, O: -1, tie: 0}; // look up table of what the scores corespond to so that we can return X/O rather than a number


// minimax function called go generate a scare for the comp when placed in position x,y
function minimax(board, depth, isMaximizing)
{
    let result = checkWinner(); // check to see if there is a winner already
    if (result !== null ) // if a winner is already found...
    {
        return scores[result]; // return the winner, don't execute minimax function
    }

    // when generating all possible outcomes, maximize score (assuming player will make best possible move)
    if (isMaximizing) // if it is the user's turn, they will be maximizing
    {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) 
        {
            for (let j = 0; j < 3; j++) 
            {
                if (board[i][j] == '') 
                {
                    board[i][j] = ai; // place the comp move and continue with the simulation by placing the next user move
                    let score = minimax(board, depth + 1, false); // increase depth of recursion and set isMaximizing to false to next simulate comp move
                    board[i][j] = ''; // remove user character from the spot after the minimax algorithm has run
                    bestScore = max(score, bestScore); // in this exact series of moves, if the resulting score is bigger than the current, set a new
                }
            }
        }
        return bestScore; // return the best possible outcome after all the simulations
    } 
    else // executed when simulating comp's move, minimizing the score to get best move for comp
    {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) 
        {
            for (let j = 0; j < 3; j++) 
            {
                if (board[i][j] == '') 
                {
                    board[i][j] = human; // place a user move and continue the simulation by placing the next comp move
                    let score = minimax(board, depth + 1, true); // increase depth of recursion and set isMaximizing to true to next simulate user move
                    board[i][j] = ''; // remove the ai character from the spot after the minimax algorithm has run
                    bestScore = min(score, bestScore); // in this exact series of moves, if the resulting score is smaller than the current, set a new
                }
            }
        }
        return bestScore; // return the best possible outcome after all the simulations
    }
}