import React from 'react'

const GridCard = ({ children, columns, columnsLg, style }) => {
  let columnsLgIn = columnsLg ?? 3
  return (
    <div className={`row row-cols-1 row-cols-md-${columns} row-cols-lg-${columnsLgIn} g-4`} style={{ ...style }}>
    {children}
  </div>
  )
}

export default GridCard