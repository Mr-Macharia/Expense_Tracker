document.getElementById('expense-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const category = document.getElementById('expense-category').value;
    const description = document.getElementById('expense-description').value;
    const amount = document.getElementById('expense-amount').value;
    const date = document.getElementById('expense-date').value;

    const expense = { category, description, amount, date };

    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });

        if (response.ok) {
            alert('Expense added successfully!');
            window.location.href = 'view_expense.html';
        } else {
            throw new Error('Failed to add expense');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the expense.');
    }
});
