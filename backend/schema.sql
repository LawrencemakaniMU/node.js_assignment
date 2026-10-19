DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  prep_time_mins INT NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  instructions TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert 10 sample records
INSERT INTO recipes (title, category, prep_time_mins, difficulty, instructions) VALUES
('Homemade Pancakes', 'Breakfast', 20, 'Easy', 'Mix flour, eggs, and milk. Cook on a hot griddle until golden brown.'),
('Spaghetti Bolognese', 'Dinner', 45, 'Medium', 'Boil pasta. Brown minced beef, add tomato sauce, and simmer. Combine together.'),
('Greek Salad', 'Lunch', 15, 'Easy', 'Chop tomatoes, cucumbers, olives, and feta cheese. Toss with olive oil and oregano.'),
('Chicken Curry', 'Dinner', 60, 'Medium', 'Sauté onions and spices, add chicken pieces and coconut milk, then simmer until cooked.'),
('Avocado Toast', 'Breakfast', 10, 'Easy', 'Toast bread, mash avocado with salt and lemon juice, and spread over toast.'),
('Beef Burger', 'Lunch', 30, 'Medium', 'Form beef patties, grill them, and serve in buns with lettuce, tomato, and cheese.'),
('Vegetable Stir-Fry', 'Dinner', 25, 'Easy', 'Stir-fry mixed vegetables in a wok with soy sauce and garlic.'),
('Chocolate Chip Cookies', 'Dessert', 40, 'Medium', 'Mix butter, sugar, flour, and chocolate chips. Bake at 180°C for 12 minutes.'),
('Mango Smoothie', 'Snack', 5, 'Easy', 'Blend fresh mango chunks with yogurt and a splash of milk until smooth.'),
('Minestrone Soup', 'Lunch', 50, 'Hard', 'Simmer beans, pasta, and assorted vegetables in a rich vegetable broth.');
