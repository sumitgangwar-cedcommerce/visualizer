import React from 'react'
import Box from './Box'

const Board = ({board , onClick}) => {
    return (
        <div className="box-wrapper">
            {
                board.map((row , rowNum) => (
                <div key={rowNum} className='row'  >
                {
                    row.map((col , colNum) => (
                        <Box type={col} col={colNum} row={rowNum} onClick={onClick}/>
                    ))
                }
                </div>
                ))
            }
        </div>
    )
}

export default Board