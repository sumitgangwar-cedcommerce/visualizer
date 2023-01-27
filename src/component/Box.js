import React from 'react'

const Box = ({type , col , row , onClick}) => {
  return (
    <button 
      key={ `${row} ${col}`} 
      className={`box box--${type}`}
      onClick={()=>onClick(row , col)}
    >
      {row} {col}
    </button>
  )
}

export default Box