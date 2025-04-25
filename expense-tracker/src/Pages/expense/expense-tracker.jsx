import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useEditTransaction } from "../../hooks/useEditTransaction";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import { useState } from "react";
import { format } from "date-fns";
import expenseStyles from "../../styles/expense.module.css";
import { MdAccountBalanceWallet } from "react-icons/md";
import { WiDirectionUp, WiDirectionDown } from "react-icons/wi";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { editTransaction } = useEditTransaction();
  const { deleteTransaction } = useDeleteTransaction();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [editMode, setEditMode] = useState(false);
  const [transactionID, setTransactionID] = useState(null);

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(transactionAmount);
    if (isNaN(amount)) return; // Prevent invalid amounts from being submitted

    if (editMode) {
      // If in edit mode, update the transaction
      await editTransaction(transactionID, {
        description,
        transactionAmount: amount,
        transactionType,
      });
    } else {
      // If not in edit mode, add a new transaction
      addTransaction({
        description,
        transactionAmount: amount,
        transactionType,
      });
    }

    setDescription("");
    setTransactionAmount("");
    setEditMode(false); // Exit edit mode
    setTransactionID(null);
  };

  const handleEdit = (transaction) => {
    setEditMode(true);
    setTransactionID(transaction.id);
    setDescription(transaction.description);
    setTransactionAmount(transaction.transactionAmount);
    setTransactionType(transaction.transactionType);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
  };

  // Format balance, income, and expenses for display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <>
      <div className={expenseStyles["expense-tracker"]}>
        <h2 className={expenseStyles["page-label"]}>Manage your Expenses</h2>
        <div className={expenseStyles["cards-container"]}>
          <div className={expenseStyles["card"]}>
            <MdAccountBalanceWallet className={expenseStyles["balance-icon"]} />
            <div className={expenseStyles["balance-container"]}>
              <h4>Balance</h4>
              {balance >= 0 ? <h2>{formatCurrency(balance)}</h2> : <h2>{formatCurrency(balance)}</h2>}
            </div>
          </div>

          <div className={expenseStyles["card"]}>
            <WiDirectionUp className={expenseStyles["income-icon"]} />
            <div className={expenseStyles["income-container"]}>
              <h4>Income</h4>
              <p>{formatCurrency(income)}</p>
            </div>
          </div>

          <div className={expenseStyles["card"]}>
            <WiDirectionDown className={expenseStyles["expense-icon"]} />
            <div className={expenseStyles["expense-container"]}>
              <h4>Expenses</h4>
              <p>{formatCurrency(expenses)}</p>
            </div>
          </div>
        </div>

        <div className={expenseStyles["main-content"]}>
          <div className={expenseStyles["form-card"]}>
            <h3 className={expenseStyles["title-label"]}>
              {editMode ? "Edit Transaction" : "Add Transaction"}
            </h3>
            <form onSubmit={onSubmit}>
              <div className={expenseStyles["input-card"]}>
                <label className={expenseStyles["transaction-label"]}>
                  Description:
                </label>
                <input
                  className={expenseStyles["input-field"]}
                  type="text"
                  placeholder="Enter the description"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label className={expenseStyles["transaction-label"]}>
                  Amount:
                </label>
                <input
                  className={expenseStyles["input-field"]}
                  type="number"
                  placeholder="Enter amount"
                  value={transactionAmount}
                  required
                  onChange={(e) => setTransactionAmount(e.target.value)}
                />
              </div>
              <div className={expenseStyles["radio-buttons"]}>
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                  required
                />
                <label htmlFor="expense">Expense</label>
                <input
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                  required
                />
                <label htmlFor="income">Income</label>
              </div>

              <button
                className={expenseStyles["add-transaction-button"]}
                type="submit"
              >
                {editMode ? "Update Transaction" : "Add Transaction"}
              </button>
            </form>
          </div>

          <div className={expenseStyles["transactions-card"]}>
            <h3 className={expenseStyles["title-label"]}>Transactions</h3>
            <ul className={expenseStyles["t-list"]}>
              {transactions.map((transaction, index) => {
                const {
                  description,
                  transactionAmount,
                  transactionType,
                  createdAt,
                  id,
                } = transaction;

                const date = createdAt ? createdAt.toDate() : new Date();
                const formattedDate = format(date, "HH:mm, MMMM dd, yyyy");

                return (
                  <li key={index}>
                    <h4>{description}</h4>
                    <p>
                      ₵{transactionAmount} --{" "}
                      <span
                        style={{
                          color:
                            transactionType === "expense" ? "red" : "green",
                        }}
                      >
                        {transactionType}
                      </span>
                    </p>
                    {date && <p className={expenseStyles["date-time"]}>{formattedDate}</p>}
                    <div className={expenseStyles["edit-and-delete-container"]}>
                      <button
                        className={expenseStyles["edit-btn"]}
                        onClick={() => handleEdit(transaction)}
                      >
                        Edit
                      </button>
                      <button
                        className={expenseStyles["delete-btn"]}
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
