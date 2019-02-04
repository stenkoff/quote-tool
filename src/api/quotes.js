const URL = 'http://morty.mockable.io/quotes'

export default function fetchQuotes(amount) {
  return fetch(`${URL}?loan_amount=${amount}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.ok && response.status === 200) {
      return response.json()
    }
    return response.text().then(message => {
      throw new Error(message)
    })
  })
}
