async function getDish() {
  const response = await fetch("/api/dishes", {
        headers: {
            'accept': 'application/json'
        },
        method: 'GET'
    });

    const data = await response.json();

    const tbody = document.getElementById('dish-table-body');
    tbody.innerHTML = ''; // Clear existing rows
    data.forEach(dish => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dish.name}</td>
            <td>${dish.Ingredients.join(',')}</td>
            <td>${dish.preperationSteps.join(',')}</td>
            <td>${dish.cookingTime} min</td>
            <td>${dish.difficulty}</td>

            <td>
            <td><button onclick="delete(${dish.id})">Delete</button></td>
            <td><button onclick="update(${dish.id})">Update</button></td>
            <td>

        `;
        tbody.appendChild(row);
    });
}

getDish();