const SORT_META = {
  lender: {
    getter: result => result.lender.name.toLowerCase(),
    type: 'string',
  },
  rate_type: {
    getter: result => result.rate_type.toLowerCase(),
    type: 'string',
  },
}

const SORT_FNS = {
  default: (dir, field) => (a, b) => {
    const comparison = parseFloat(a[field], 10) - parseFloat(b[field], 10)
    return dir === 'asc' ? comparison : comparison * -1
  },
  string: (dir, getter) => (a, b) => {
    const valA = getter(a)
    const valB = getter(b)
    let comparison
    if (valA < valB) comparison = -1
    else if (valA > valB) comparison = 1
    else comparison = 0
    return dir === 'asc' ? comparison : comparison * -1
  },
}

export function sortResults(dir, field, results) {
  const filter = SORT_META[field]
  let comparatorFn
  if (filter) {
    const {getter, type} = filter
    comparatorFn = SORT_FNS[type](dir, getter)
  } else {
    comparatorFn = SORT_FNS.default(dir, field)
  }
  return results.sort(comparatorFn)
}

const FILTER_META = {
  lender: result => result.lender.name,
}

export function filterResults(filters, results) {
  if (!results) return
  const fields = Object.keys(filters).filter(field => filters[field].size > 0)
  return results.filter(result =>
    fields.every(field =>
      Array.from(filters[field]).some(val =>
        FILTER_META[field] ? FILTER_META[field](result) === val : result[field] === val
      )
    )
  )
}

export function getDisplayName(string) {
  return string.replace(/_/g, ' ')
}

export function comparator(a, b) {
  const valA = parseFloat(a, 10)
  const valB = parseFloat(b, 10)
  const diff = valA - valB
  if (!Number.isNaN(diff)) return diff
  if (a < b) return -1
  if (a > b) return 1
  return 0
}
