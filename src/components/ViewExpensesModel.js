import { Button,  Modal, Stack } from "react-bootstrap";

import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModel({ budgetId, show, handleClose}) {
   
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudget()
    
    const expenses = getBudgetExpenses(budgetId)

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? 
    { name : "Uncatergorized", id: UNCATEGORIZED_BUDGET_ID} 
    : budgets.find(b => b.id === budgetId)

    return (
    <Modal show={budgetId != null} onHide={handleClose}>
        
            <Modal.Header closeButton>
                <Stack direction="horizontal" gap="2">
                    <div>Expenses - {budget?.name}</div>
                    {budgetId !== UNCATEGORIZED_BUDGET_ID &&(
                         <Button onClick={() => {
                            deleteBudget(budget)
                            handleClose()
                        }} variant="outline-danger" >Delete</Button>
                    )}
                </Stack>
                
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        
    </Modal>
  )
}
