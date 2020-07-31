import React from 'react'; 
import './App.css'

export default function Rules(){
    return(
        <div className='rules'>
            <h1>Conway's Game Of Life</h1>
            <h2>Rules: </h2>
            <h3>
                Any live cell with fewer than two live neighbours dies, as if by underpopulation.<br/>
                Any live cell with two or three live neighbours lives on to the next generation.<br/>
                Any live cell with more than three live neighbours dies, as if by overpopulation.<br/>
                Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.<br/>
            </h3>
        </div>
    )
}