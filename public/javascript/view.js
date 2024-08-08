async function loadExpenses() {
    try {
        const response = await fetch('/api/expenses');
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }

        const expenses = await response.json();
        const tableBody = document.getElementById('expenses-table');

        expenses.forEach(expense => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${expense.id}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>${expense.date}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load expenses.');
    }
}

// Load expenses when the page loads
window.onload = loadExpenses;
