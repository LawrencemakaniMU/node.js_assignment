const API_URL = 'http://localhost:3000/api/recipes';

const recipeForm = document.getElementById('recipeForm');
const recipeTableBody = document.getElementById('recipeTableBody');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const recipeIdInput = document.getElementById('recipeId');

// Fetch and render records on page load
document.addEventListener('DOMContentLoaded', fetchRecipes);

async function fetchRecipes() {
  try {
    const response = await fetch(API_URL);
    const recipes = await response.json();
    
    recipeTableBody.innerHTML = '';
    recipes.forEach(recipe => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${recipe.id}</td>
        <td>${recipe.title}</td>
        <td>${recipe.category}</td>
        <td>${recipe.prep_time_mins}</td>
        <td>${recipe.difficulty}</td>
        <td class="actions">
          <button class="btn-edit" onclick="editRecipe(${recipe.id}, '${escapeHtml(recipe.title)}', '${escapeHtml(recipe.category)}', ${recipe.prep_time_mins}, '${recipe.difficulty}', '${escapeHtml(recipe.instructions)}')">Edit</button>
          <button class="btn-delete" onclick="deleteRecipe(${recipe.id})">Delete</button>
        </td>
      `;
      recipeTableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

// Handle Form Submission (Create or Update)
recipeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = recipeIdInput.value;
  const recipeData = {
    title: document.getElementById('title').value,
    category: document.getElementById('category').value,
    prep_time_mins: parseInt(document.getElementById('prep_time_mins').value),
    difficulty: document.getElementById('difficulty').value,
    instructions: document.getElementById('instructions').value
  };

  try {
    if (id) {
      // Update existing record (PUT)
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });
    } else {
      // Create new record (POST)
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });
    }

    resetForm();
    fetchRecipes();
  } catch (error) {
    console.error('Error saving recipe:', error);
  }
});

// Load values into form for editing
function editRecipe(id, title, category, prep_time_mins, difficulty, instructions) {
  recipeIdInput.value = id;
  document.getElementById('title').value = title;
  document.getElementById('category').value = category;
  document.getElementById('prep_time_mins').value = prep_time_mins;
  document.getElementById('difficulty').value = difficulty;
  document.getElementById('instructions').value = instructions;

  formTitle.textContent = 'Edit Recipe';
  submitBtn.textContent = 'Update Recipe';
  cancelBtn.style.display = 'inline-block';
}

// Delete record (DELETE)
async function deleteRecipe(id) {
  if (confirm('Are you sure you want to delete this recipe?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  }
}

// Cancel edit mode
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  recipeForm.reset();
  recipeIdInput.value = '';
  formTitle.textContent = 'Add New Recipe';
  submitBtn.textContent = 'Save Recipe';
  cancelBtn.style.display = 'none';
}

function escapeHtml(str) {
  return str.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}
