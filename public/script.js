let dishId = null; // Variable to store the ID of the dish being updated

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

async function deleteDish(_id) {
    const confirmDelete = confirm('Are you sure you want to delete this dish?');
    if (!confirmDelete) return; {
    try {
        const response = await fetch(`/api/dishes/${_id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Dish deleted successfully');
            getDish(); // Refresh the dish list
        } else {
            alert('Error deleting dish');
        }
    } catch (error) {
        console.error('Error deleting dish:', error);
        alert('Error deleting dish');
    }
}
    
}
async function updateDish(_id) {
    fetch(`/api/dishes/${_id}`)
    .then(res => res.json())
    .then(dish => {
        document.getElementById('dish-name').value = dish.name;
        document.getElementById('dish-ingredients').value = dish.ingredients.join(', ');
        document.getElementById('dish-preperationSteps').value = dish.preperationSteps.join(', ');
        document.getElementById('dish-cookingTime').value = dish.cookingTime;
        document.getElementById('dish-difficulty').value = dish.difficulty;
        dishId = _id;
    })
}

document.getElementById('dish-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const newDish = {
      name: document.getElementById('dish-name').value,
      ingredients: document.getElementById('dish-ingredients').value.split(','),
      preperationSteps: document.getElementById('dish-preperationSteps').value.split(','),
      cookingTime: parseInt(document.getElementById('dish-cookingTime').value),
      difficulty: document.getElementById('dish-difficulty').value
    };
  
    const url = dishId ? `/api/dishes/${dishId}` : '/api/dishes';
    const method = dishId ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDish)
      });
  
      if (response.ok) {
        alert(dishId ? 'Dish updated!' : 'New course added!');
        document.getElementById('dish-form').reset();
        dishId = null;
        document.querySelector('#dish-form button').textContent = 'Add Dish';
        getDish();
      } else {
        alert('Something went wrong!');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('A error occured.');
    }
  });
  

getDish();