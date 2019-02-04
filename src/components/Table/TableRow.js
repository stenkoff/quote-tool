import * as React from 'react'

import cs from './styles.css'

function getCellValue(result, meta) {
  if (meta === 'lender') {
    return result.lender.name
  }
  return result[meta]
}

export default function TableRow(props) {
  const {metadata, result} = props
  return (
    <tr className={cs.row}>
      {metadata.map(meta => (
        <td className={cs.cell} key={result[meta]}>
          {getCellValue(result, meta)}
        </td>
      ))}
    </tr>
  )
}
