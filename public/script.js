let dishId = null; // Saves the ID for course that updates

// Shows every dish
async function getDish() {
  const response = await fetch("/api/dishes");
  const data = await response.json();

  const tbody = document.getElementById('dish-table-body');
  tbody.innerHTML = '';

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
        <button onclick="loadDishForUpdate('${dish._id}')">Update</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// POST – Add new dish
document.getElementById('add-btn').addEventListener('click', async () => {
  const newDish = collectFormData();

  try {
    const response = await fetch('/api/dishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDish)
    });

    if (response.ok) {
      alert('Dish added!');
      resetForm();
      getDish();
    } else {
      alert('Failed to add dish!');
    }
  } catch (err) {
    console.error('POST error:', err);
  }
});

// PUT – Uppdate existing dish in the database
document.getElementById('update-btn').addEventListener('click', async () => {
  const updatedDish = collectFormData();

  try {
    const response = await fetch(`/api/dishes/${dishId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDish)
    });

    if (response.ok) {
      alert('Dish updated!');
      dishId = null;
      resetForm();
      toggleButtons("add");
      getDish();
    } else {
      alert('Update failed!');
    }
  } catch (err) {
    console.error('PUT error:', err);
  }
});

// DELETE – Remove a dish from the database
async function deleteDish(id) {
  if (!confirm('Are you sure you want to delete this dish?')) return;

  try {
    const response = await fetch(`/api/dishes/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Dish deleted!');
      getDish();
    }
  } catch (err) {
    console.error('DELETE error:', err);
  }
}

// load dish for update with id
async function loadDishForUpdate(id) {
  const response = await fetch(`/api/dishes/${id}`);
  const dish = await response.json();

  document.getElementById('dish-name').value = dish.name;
  document.getElementById('dish-ingredients').value = dish.ingredients.join(', ');
  document.getElementById('dish-preperationSteps').value = dish.preperationSteps.join(', ');
  document.getElementById('dish-cookingTime').value = dish.cookingTime;
  document.getElementById('dish-difficulty').value = dish.difficulty;

  dishId = id;
  toggleButtons("update");
}

// Reset form and buttons
function resetForm() {
  document.getElementById('dish-form').reset();
  dishId = null;
  toggleButtons("add");
}

// Change between add and update buttons
function toggleButtons(mode) {
  document.getElementById('add-btn').style.display = mode === "add" ? 'inline-block' : 'none';
  document.getElementById('update-btn').style.display = mode === "update" ? 'inline-block' : 'none';
  document.getElementById('cancel-btn').style.display = mode === "update" ? 'inline-block' : 'none';
}

// Exit update mode
document.getElementById('cancel-btn').addEventListener('click', () => {
  resetForm();
});

// Get values from the form
function collectFormData() {
  return {
    name: document.getElementById('dish-name').value,
    ingredients: document.getElementById('dish-ingredients').value.split(','),
    preperationSteps: document.getElementById('dish-preperationSteps').value.split(','),
    cookingTime: parseInt(document.getElementById('dish-cookingTime').value),
    difficulty: document.getElementById('dish-difficulty').value
  };
}

// Runs when the page loads
getDish();
