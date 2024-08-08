document.querySelector('.expense-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const expenseId = document.getElementById('expense-id').value;
    const expenseDescription = document.getElementById('expense-description').value;
    const expenseAmount = document.getElementById('expense-amount').value;
    const expenseDate = document.getElementById('expense-date').value;
    const expenseCategory = document.getElementById('expense-category').value;

    const expenseData = {
        description: expenseDescription,
        amount: parseFloat(expenseAmount),
        date: expenseDate,
        category: expenseCategory,
    };

    try {
        const response = await fetch(`/api/expenses/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
        });

        if (response.ok) {
            alert('Expense updated successfully!');
            window.location.href = 'view_expense.html'; // Redirect to view expenses page
        } else {
            alert('Failed to update expense. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});


document.querySelector('.delete-button').addEventListener('click', async function () {
    const expenseId = document.getElementById('expense-id').value;

    if (confirm('Are you sure you want to delete this expense?')) {
        try {
            const response = await fetch(`/api/expenses/${expenseId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const { message } = await response.json();
                alert(message);
                window.location.href = 'view_expense.html';
            } else {
                const { error } = await response.json();
                alert(`Failed to delete expense: ${error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`An error occurred while deleting the expense: ${error.message}`);
        }
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    const params = new URLSearchParams(window.location.search);
    const expenseId = params.get('id');

    if (expenseId) {
        try {
            const response = await fetch(`/api/expenses/${expenseId}`);
            const expense = await response.json();

            document.getElementById('expense-id').value = expense.id;
            document.getElementById('expense-description').value = expense.description;
            document.getElementById('expense-amount').value = expense.amount;
            document.getElementById('expense-date').value = expense.date;
            document.getElementById('expense-category').value = expense.category;
        } catch (error) {
            console.error('Error fetching expense:', error);
        }
    }
});

