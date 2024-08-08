document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/api/expenses');
        const expenses = await response.json();

        const expenseList = document.getElementById('expense-list');
        expenseList.innerHTML = ''; // Clear existing content

        // Function to format the date
        function formatDate(dateString) {
            const date = new Date(dateString);
            // Formatting to YYYY-MM-DD
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JS
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        expenses.forEach(expense => {
            const row = document.createElement('tr');
            
            // Apply formatDate to expense.date
            const formattedDate = formatDate(expense.date);

            row.innerHTML = `
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>${formattedDate}</td>
                <td>${expense.category}</td>
                <td>
                    <button class="edit-button" data-id="${expense.id}">Edit</button>
                    <button class="delete-button" data-id="${expense.id}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row);
        });

        // Handle Edit button clicks
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                window.location.href = `edit_expense.html?id=${id}`;
            });
        });

        // Handle Delete button clicks
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async () => {
                const id = button.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this expense?')) {
                    try {
                        const response = await fetch(`/api/expenses/${id}`, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            alert('Expense deleted successfully!');
                            window.location.reload(); // Reload the table
                        } else {
                            alert('Failed to delete expense.');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
});
