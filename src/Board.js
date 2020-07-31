import React from 'react';
import './Board.css';
import { Button, TextField } from '@material-ui/core'; 

const boardwidth = 800;
const boardheight = 600;
const sizeofcell = 25; 

class Board extends React.Component {

    constructor() {
        super();
        this.rows = boardheight / sizeofcell;
        this.cols = boardwidth / sizeofcell;

        this.board = this.generateEmptyGrid();
    }

    state = {
        cells: [],
        isRunning: false,
        interval: 100,
        generations: 0
    }

    generateEmptyGrid() {
        let grid = [];
        for (let y = 0; y < this.rows; y++) {
            grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                grid[y][x] = false;
            }
        }

        return grid;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }

    handleClick = (event) => {

        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / sizeofcell);
        const y = Math.floor(offsetY / sizeofcell);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    }

    beginGame = () => {
        this.setState({ isRunning: true });
        this.runGeneration();
    }

    endGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    runGeneration() {
        let newGrid = this.generateEmptyGrid();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.countNeighbors(this.board, x, y);
                if (this.board[y][x]) { // If the cell is alive
                    if (neighbors === 2 || neighbors === 3) {
                        newGrid[y][x] = true;
                    } else {
                        newGrid[y][x] = false;
                    }
                } else { // If the cell is dead
                    if (!this.board[y][x] && neighbors === 3) {
                        newGrid[y][x] = true;
                    }
                }
            }
        }

        this.board = newGrid;
        this.setState({ cells: this.makeCells() });
        this.setState(prevState => {
            return {generations: prevState.generations + 1}
         })

        this.timeoutHandler = window.setTimeout(() => {
            this.runGeneration();
        }, this.state.interval);
    }

    /**
     * Calculate the number of neighbors at point (x, y)
     * @param {Array} board 
     * @param {int} x 
     * @param {int} y 
     */
    countNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }

    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    }

    clearBoard = () => {
        this.board = this.generateEmptyGrid();
        this.setState({ cells: this.makeCells() });
        this.setState({ generations: 0 })
    }

    generateRandom = () => {

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.makeCells() });
    }

    

    render() {
        const { cells, isRunning } = this.state;
        return (
            <div className='game'>
                <div className="Board"
                    style={{ width: boardwidth, height: boardheight, backgroundSize: `${sizeofcell}px ${sizeofcell}px`}}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>
                <h2>Generations: {this.state.generations}    </h2>
                <div className="buttons">
                    <TextField variant='outlined' value={this.state.interval} onChange={this.handleIntervalChange} /> <h3>Set the time in milliseconds (default: 100)</h3>
                    {isRunning ?
                        <Button size='large' variant='contained' color='primary' className="button" onClick={this.endGame}>End Game</Button> :
                        <Button size='large' variant='contained' color='primary' className="button" onClick={this.beginGame}>Begin Game</Button>
                    }
                    <Button size='large' variant='contained' color='primary' className="button" onClick={this.generateRandom}>Generate Random</Button>
                    <Button size='large' variant='contained' color='primary' className="button" onClick={this.clearBoard}>Clear Board</Button>
                </div>
            </div>
        );
    }
}

class Cell extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${sizeofcell * x + 1}px`,
                top: `${sizeofcell * y + 1}px`,
                width: `${sizeofcell - 1}px`,
                height: `${sizeofcell - 1}px`,
            }} />
        );
    }
}

export default Board;