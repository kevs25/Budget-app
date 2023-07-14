import { Button, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModel from "./components/AddBudgetModel";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "./contexts/BudgetContext";
import AddExpenseModel from "./components/AddExpenseModel";
import UnCategorizedBugetCard from "./components/UnCategorizedBugetCard";
import TotalBugetCard from "./components/TotalBudgetCard";
import ViewExpensesModel from "./components/ViewExpensesModel";


function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setShowAddExpenseModalBudgetId] = useState()
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudget()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setShowAddExpenseModalBudgetId(budgetId)
  }

  return (
  <>
    <Container className="my-4">
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">Budgets</h1>
      <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
    </Stack>
    <div
        style={{ display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap : "1rem", 
        alignItems : "flex-start"}}
      >
        {budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount, 0
          )
          return (
          <BudgetCard 
            key={budget.id}
            name={budget.name} 
            amount={amount} 
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
            />
            )
        })}
        <UnCategorizedBugetCard 
        onAddExpenseClick={openAddExpenseModal}
        onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
        />
        <TotalBugetCard />
    </div>
    
    </Container>
    <AddBudgetModel show={showAddBudgetModal} handleClose={() =>{
      setShowAddBudgetModal(false)
    }}/>
    <AddExpenseModel 
      show={showAddExpenseModal} 
      defaultBudgetId={addExpenseModalBudgetId}
      handleClose={() =>{ setShowAddExpenseModal(false) }}
    />
    <ViewExpensesModel 
      budgetId={viewExpenseModalBudgetId}
      handleClose={() =>{ setViewExpenseModalBudgetId()}}
    />
  </>
  )
}

export default App;
