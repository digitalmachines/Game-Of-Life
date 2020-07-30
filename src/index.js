import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(
  <Main/>, 
document.getElementById('root')
);

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

function Main(){ 

  const speed = 100; 
  const rows = 30; 
  const cols = 50; 

  const [generations, setGenerations] = useState(0); 
  const [gridFull, setGridFull] = useState([Array(rows).fill().map(() => {
    Array(cols).fill(false)
  })])

  const otherGrid = [rows].fill().map(() => {
    [cols].fill(false)
  })

  console.log(gridFull, otherGrid); 

  const selectBox = (row, col) => {
		let gridCopy = arrayClone(gridFull);
		gridCopy[row][col] = !gridCopy[row][col];
    setGridFull(gridCopy); 
	}

  return(
    <div>
      <h1>Conway's Game Of Life</h1>
      <Grid 
      gridFull={gridFull}
      rows={rows}
      cols={cols}
      selectBox={selectBox}
      />
      <h2>Generations: {generations}</h2>
    </div>
  )
}

function Grid(props){
  console.log("Grid Props: ", props)

  const width = props.cols * 14; 
  var rowsArr = []; 
  
  var boxClass = ""; 
  for(var i=0; i < props.rows; i++){
    for(var j=0; j < props.cols; j++){
      let boxId = i + "_" + j; 



      boxClass = props.gridFull[i][j] ? "box on" : "box off"
      rowsArr.push(
        <Box 
        boxClass={boxClass}
        key={boxId}
        boxId={boxId}
        row={i}
        col={j}
        selectBox={props.selectBox}
        />
        )
    }
  }

  return(
    <div className="grid" style={{width: width }}>
      {rowsArr}
    </div>
  )
}

function Box(props){

  const selectBox = (props) => {
    props.selectBox(props.row, props.col); 
  }

  return(
    <div className={props.boxClass} 
    id={props.id}
    onClick={selectBox}
    />
  )
}
