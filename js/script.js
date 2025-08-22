console.log('Script loaded');
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('input[type="text"]');
    const dateInput = document.querySelector('input[type="date"]');
    const addButton = document.querySelector('.add-btn');
    const deleteAllBtn = document.querySelector('.delete-btn');
    const tbody = document.querySelector('tbody');
    const filterBtn = document.querySelector('.filter-btn');

    let currentFilter = 'all';

    filterBtn.addEventListener('click', () => {
    switch(currentFilter) {
        case 'all':
            currentFilter = 'pending';
            filterBtn.textContent = 'PENDING';
            break;
        case 'pending':
            currentFilter = 'completed';
            filterBtn.textContent = 'COMPLETED';
            break;
        default:
            currentFilter = 'all';
            filterBtn.textContent = 'FILTER';
    }

    const allRows = Array.from(tbody.querySelectorAll('tr'));
    const taskRows = allRows.filter(row => !row.querySelector('.no-task'));

    const noTaskMessage = tbody.querySelector('.no-task');
    if (noTaskMessage) {
        noTaskMessage.parentElement.remove();
    }

    let visibleCount = 0;
    taskRows.forEach(row => {
        const statusCell = row.querySelector('.status');
        const status = statusCell ? statusCell.textContent.toLowerCase() : '';
        
        if (currentFilter === 'all' || status === currentFilter) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    if (visibleCount === 0 && taskRows.length > 0) {
        const noMatchRow = document.createElement('tr');
        noMatchRow.innerHTML = '<td colspan="4" class="no-task">No matching tasks found</td>';
        tbody.appendChild(noMatchRow);
    }

    console.log('Filter applied:', currentFilter);
});


    addButton.addEventListener('click', () => {
        const task = todoInput.value.trim();
        const date = dateInput.value;
        
        if (task && date) {
            const noTasks = tbody.querySelector('tr td[colspan="4"]');
            if (noTasks) {
                noTasks.remove();
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${task}</td>
                <td>${date}</td>
                <td class="status">Pending</td>
            <td class="action-buttons">
                <button class="status-btn" title="Change Status">✓</button>
                <button class="delete-task-btn">❌</button>
                </td>
            `;
            tbody.appendChild(tr);
            todoInput.value = '';
            dateInput.value = '';
        }

        console.log('added data:', task, date);
    });

     tbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('status')) {
            e.target.textContent = e.target.textContent === 'Pending' ? 'Completed' : 'Pending';
        }
        console.log('Status toggled:', e.target.textContent);
    });

   function checkEmptyTable() {
       const allRows = tbody.querySelectorAll('tr');
        allRows.forEach(row => row.remove());
        tbody.innerHTML = '<tr><td colspan="4" class="no-task">No task found</td></tr>';
    }
    
    deleteAllBtn.addEventListener('click', () => {
        tbody.innerHTML = '';
        checkEmptyTable();
        console.log('All tasks deleted');
    });


    tbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task-btn')) {
            const row = e.target.closest('tr');
            if (row) {
                row.remove();
                const remainingTasks = tbody.querySelectorAll('tr:not(.no-task)');
                if (remainingTasks.length === 0) {
                    checkEmptyTable();
                }
            }
        }

        if (e.target.classList.contains('status-btn')) {
        const row = e.target.closest('tr');
        const statusCell = row.querySelector('.status');
        const statusBtn = e.target;
        
        if (statusCell.textContent === 'Pending') {
            statusCell.textContent = 'Completed';
            statusCell.style.color = '#4CAF50';
            statusBtn.style.backgroundColor = '#4CAF50';
        } else {
            statusCell.textContent = 'Pending';
            statusCell.style.color = '';
            statusBtn.style.backgroundColor = '';
        }
    }
    console.log('Updated task status:', e.target.textContent);  
    });
    if (tbody.children.length === 0) {
        checkEmptyTable();
    }
});