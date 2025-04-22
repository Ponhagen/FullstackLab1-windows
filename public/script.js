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
        <td>${dish.ingredients.join(', ')}</td>
        <td>${dish.preperationSteps.join(', ')}</td>
        <td>${dish.cookingTime} min</td>
        <td>${dish.difficulty}</td>
        <td>
          <button onclick="deleteDish('${dish._id}')">Delete</button>
          <button onclick="updateDish('${dish._id}')">Update</button>
        </td>
      `;
      
        tbody.appendChild(row);
    });
}

getDish();