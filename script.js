let employees = [];

document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const profession = document.getElementById('profession').value;
    const age = document.getElementById('age').value;

    if (name.trim() === '' || profession.trim() === '' || age.trim() === '') {
        showError("Error: Please make sure all the fields are filled before adding an employee!");
        return;
    }

    const employee = {
        id: Date.now(),
        name: name,
        profession: profession,
        age: parseInt(age)
    };

    employees.push(employee);
    showSuccess("Success: Employee Added!");
    displayEmployees();
    document.getElementById('employeeForm').reset();
});

function showError(message) {
    const errorDiv = document.querySelector('.error-msg');
    errorDiv.style.display = 'block';
    errorDiv.innerHTML = `<p>${message}</p>`;
    setTimeout(function() {
        errorDiv.style.display = 'none';
    }, 3000);
}

function showSuccess(message) {
    const successDiv = document.querySelector('.success-msg');
    successDiv.style.display = 'block';
    successDiv.innerHTML = `<p>${message}</p>`;
    setTimeout(function() {
        successDiv.style.display = 'none';
    }, 3000);
}

function displayEmployees() {
    const employeeCount = document.getElementById('employeeCount');
    const employeeList = document.getElementById('employeeList');
    let count = 0; 
    employeeCount.textContent = employees.length;

    employeeList.innerHTML = '';

    employees.forEach(function(employee, index) {
        count = index + 1; // Increment count for each employee

        const employeeCard = document.createElement('div');
        employeeCard.classList.add('employee-card');

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('employee-details');
        detailsDiv.textContent = `ID: ${count}  Name: ${employee.name} Profession: ${employee.profession} Age: ${employee.age}`;

        const deleteButtonDiv = document.createElement('div');
        deleteButtonDiv.classList.add('deleteButton');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete User';
        deleteButton.addEventListener('click', function() {
            deleteEmployee(employee.id);
        });

        deleteButtonDiv.appendChild(deleteButton);
        employeeCard.appendChild(detailsDiv);
        employeeCard.appendChild(deleteButtonDiv);
        employeeList.appendChild(employeeCard);
    });
}


function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);
    displayEmployees();
}
