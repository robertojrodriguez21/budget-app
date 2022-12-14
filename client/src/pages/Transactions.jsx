import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Transactions = ({user, BASE_URL}) => {
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])

  let navigate = useNavigate()

  useEffect(() => {
    const getUserTransactions = async () => {
      let response = await axios.get(`${BASE_URL}/transaction/${user.id}`)
      setTransactions(response.data)
    }

    getUserTransactions()
  }, [])

  useEffect(() => {
    const getUserAccounts = async () => {
      let response = await axios.get(`${BASE_URL}/account/${user.id}`)
      setAccounts(response.data)
    }

    getUserAccounts()
  }, [])

  const getAccountName = (accountId) => {
    for (let i = 0; i < accounts.length; i++) {
      if (accountId === accounts[i].id) {
        return accounts[i].name
      }
    }
  }

  const getAccountType = (accountId) => {
    for (let i = 0; i < accounts.length; i++) {
      if (accountId === accounts[i].id) {
        switch (accounts[i].type) {
          case 1:
            return 'Checking'
          case 2:
            return 'Savings'
          case 3:
            return 'Credit Card'
          case 4:
            return 'Loan'
          default:
            return 'N/A'
        }
      }
    }
  }

  return (
    <div className="container text-start">
      <br></br>
      <div className="container row">
        <h1 className="col-10" >Recent Transactions</h1>
        <button type="button" className="col-2 btn btn-success btn-lg" onClick={() => {navigate('/transactions')}}>View All</button>
      </div>
      <br></br>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Account</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="table-active" onClick={() => {navigate(`/transactions/${transaction.id}`)}}>
              <th scope="row">{transaction.name}</th>
              <td>{getAccountName(transaction.accountId)} - {getAccountType(transaction.accountId)}</td>
              <td>{transaction.date}</td>
              <td>${transaction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions