import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function UnCategorizedBugetCard(props) {
    const {getBudgetExpenses} = useBudget()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount, 0
      )
    if (amount === 0) return null
    return (
        <BudgetCard amount={amount} name="uncategorized" gray {...props}/>
    )
}
