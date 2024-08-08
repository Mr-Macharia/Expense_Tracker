document.querySelector('.expense-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const expenseId = document.getElementById('expense-id').value;
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = document.getElementById('expense-amount').value;
    const expenseDate = document.getElementById('expense-date').value;
    const expenseCategory = document.getElementById('expense-category').value;
    const expenseNotes = document.getElementById('expense-notes').value;

    const expenseData = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
        date: expenseDate,
        category: expenseCategory,
        notes: expenseNotes,
    };

    try {
        const response = await fetch(`/api/expenses/${expenseId}`, { // Adjust the endpoint as per your API
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