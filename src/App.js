//    **Your simulation will receive a 2 when it satisfies the following:**

//    1. Display includes a text area that shows the current generation of
//       cells being displayed
//    2. Display includes a grid of cells, at least 25x25, that can be
//       toggled to be _alive_ or _dead_
//    3. Display includes working buttons that start / stop the animation
//       and clear the grid
//    4. Algorithm to generate new generations of cells correctly
//       implemented
//    5. At least 3 features from ***Custom Features*** section
//       successfully implemented
//    6. Application includes a section outlining the rules to Conway's
//       "Game of Life"
import React from 'react'; 
import Board from './Board'; 

export default function App(){
	return(
		<Board/>
	)
}