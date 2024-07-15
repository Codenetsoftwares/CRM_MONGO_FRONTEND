import React from 'react'

const GridCard = ({ children, columns, style }) => {
  return (
    <div className={`row row-cols-1 row-cols-md-${columns} g-4`} style={{ ...style }}>
    {children}
  </div>
  )
}

export default GridCard