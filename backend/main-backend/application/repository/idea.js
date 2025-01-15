const ideas = [
  {
    title: "Two Sum",
    description: `
### Problem:
Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

- You may assume that each input would have exactly one solution, and you may not use the same element twice.

### Example:
\`\`\`javascript
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
\`\`\`

### Constraints:
- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Reverse String",
    description: `
### Problem:
Write a function that reverses a string. The input string is given as an array of characters \`s\`.

### Example:
\`\`\`javascript
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^5\`
- \`s[i]\` is a printable ascii character.

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Palindrome Number",
    description: `
### Problem:
Determine whether an integer is a palindrome. An integer is a palindrome if it reads the same backward as forward.

### Example:
\`\`\`javascript
Input: x = 121
Output: true
\`\`\`

### Constraints:
- \`-2^31 <= x <= 2^31 - 1\`

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Valid Anagram",
    description: `
### Problem:
Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\` and \`false\` otherwise.

### Example:
\`\`\`javascript
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\`

### Constraints:
- \`1 <= s.length, t.length <= 5 * 10^4\`

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Remove Duplicates from Sorted Array",
    description: `
### Problem:
Given a sorted array \`nums\`, remove the duplicates in place such that each element appears only once and return the new length.

### Example:
\`\`\`javascript
Input: nums = [1,1,2]
Output: 2
\`\`\`

### Constraints:
- \`1 <= nums.length <= 3 * 10^4\`
- \`-100 <= nums[i] <= 100\`
- \`nums\` is sorted in non-decreasing order.

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Merge Two Sorted Lists",
    description: `
### Problem:
Merge two sorted linked lists into one sorted list. The new list should be made by splicing together the nodes of the first two lists.

### Example:
\`\`\`javascript
Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]
\`\`\`

### Constraints:
- The number of nodes in both lists is in the range [0, 50].

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Maximum Subarray",
    description: `
### Problem:
Given an integer array \`nums\`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

### Example:
\`\`\`javascript
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Single Number",
    description: `
### Problem:
Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find that single one.

### Example:
\`\`\`javascript
Input: nums = [2,2,1]
Output: 1
\`\`\`

### Constraints:
- \`1 <= nums.length <= 3 * 10^4\`
- \`-3 * 10^4 <= nums[i] <= 3 * 10^4\`

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Move Zeroes",
    description: `
### Problem:
Given an array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.

### Example:
\`\`\`javascript
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^4\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Intersection of Two Arrays II",
    description: `
### Problem:
Given two arrays \`nums1\` and \`nums2\`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays.

### Example:
\`\`\`javascript
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
\`\`\`

### Constraints:
- \`1 <= nums1.length, nums2.length <= 1000\`
- \`0 <= nums1[i], nums2[i] <= 1000\`

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: `
### Problem:
You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy and a single day to sell the stock.

### Example:
\`\`\`javascript
Input: prices = [7,1,5,3,6,4]
Output: 5
\`\`\`

### Constraints:
- \`1 <= prices.length <= 10^5\`
- \`0 <= prices[i] <= 10^4\`

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
  {
    title: "Plus One",
    description: `
### Problem:
Given a non-empty array of digits representing a non-negative integer, increment the integer by one.

### Example:
\`\`\`javascript
Input: digits = [1,2,3]
Output: [1,2,4]
\`\`\`

### Constraints:
- \`1 <= digits.length <= 100\`
- \`0 <= digits[i] <= 9\`

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },

  {
    title: "Create a Simple To-Do List",
    shortDescription: "A basic to-do list app to add and remove tasks.",
    description: `
### Task:
Build a \`ToDo\` class with properties like \`title\` and \`completed\`. Implement methods for adding, removing, and toggling tasks.

- **Methods**:
  - \`ToDo.addTask(title)\`: Adds a task to the list.
  - \`ToDo.removeTask(id)\`: Removes a task from the list.
  - \`ToDo.toggleCompletion(id)\`: Toggles the completion status of a task.

### Example Usage:
\`\`\`javascript
ToDo.addTask('Learn JavaScript');   // Adds a task
ToDo.toggleCompletion(1);           // Marks the task as completed
\`\`\`

### Requirements:
- Allow users to manage a list of tasks.
- Implement functionality for marking tasks as completed.

### Languages:
- JavaScript, Python, Java, Go
    `,
    languages: ["JavaScript", "Python", "Java", "Go"],
    difficulty: "easy",
    cloneCount: 0,
    tags: ["task management", "OOP", "list management"],
  },
  {
    title: "Simple Blog App",
    shortDescription: "A blog platform for adding and displaying blog posts.",
    description: `
### Task:
Design a \`BlogPost\` class to manage blog entries, and a \`Blog\` class to handle multiple posts. 

- **Methods**:
  - \`Blog.addPost(title, content)\`: Adds a new blog post.
  - \`Blog.removePost(id)\`: Removes a post.
  - \`Blog.viewPosts()\`: Displays all blog posts.

### Example Usage:
\`\`\`javascript
Blog.addPost('First Blog Post', 'Content of the post');
Blog.viewPosts();  // Displays all posts
\`\`\`

### Requirements:
- Allow users to add and remove posts.
- Implement displaying all posts.

### Languages:
- JavaScript, Python, Java, Go
    `,
    languages: ["JavaScript", "Python", "Java", "Go"],
    difficulty: "easy",
    cloneCount: 0,
    tags: ["blog", "content management", "OOP"],
  },
  {
    title: "Basic Calculator",
    shortDescription: "Create a basic calculator for arithmetic operations.",
    description: `
### Task:
Build a \`Calculator\` class with methods for basic arithmetic operations like addition, subtraction, multiplication, and division.

- **Methods**:
  - \`Calculator.add(a, b)\`: Returns \`a + b\`.
  - \`Calculator.subtract(a, b)\`: Returns \`a - b\`.
  - \`Calculator.multiply(a, b)\`: Returns \`a * b\`.
  - \`Calculator.divide(a, b)\`: Returns \`a / b\`.

### Example Usage:
\`\`\`javascript
Calculator.add(4, 5);    // Returns 9
Calculator.divide(10, 2); // Returns 5
\`\`\`

### Requirements:
- Perform basic arithmetic calculations.

### Languages:
- JavaScript, Python, Java, Go
    `,
    languages: ["JavaScript", "Python", "Java", "Go"],
    difficulty: "easy",
    cloneCount: 0,
    tags: ["calculator", "basic math", "OOP"],
  },
  {
    title: "Weather App",
    shortDescription:
      "Create an app that fetches weather data based on location.",
    description: `
### Task:
Design a \`Weather\` class that fetches weather information from a public API.

- **Methods**:
  - \`Weather.getCurrentWeather(location)\`: Fetches and returns the current weather for a location.

### Example Usage:
\`\`\`javascript
Weather.getCurrentWeather('New York');  // Fetches weather data for New York
\`\`\`

### Requirements:
- Display the weather conditions (temperature, humidity, etc.) for a given location.
- Use a public API (like OpenWeatherMap) to fetch data.

### Languages:
- JavaScript, Python, Java, Go
    `,
    languages: ["JavaScript", "Python", "Java", "Go"],
    difficulty: "medium",
    cloneCount: 0,
    tags: ["API", "weather", "data fetching"],
  },
  {
    title: "Personal Budget Tracker",
    shortDescription: "Create a system to track personal finances.",
    description: `
### Task:
Build a \`Budget\` class to track income, expenses, and calculate balance.

- **Methods**:
  - \`Budget.addIncome(amount)\`: Adds an income amount to the balance.
  - \`Budget.addExpense(amount)\`: Adds an expense amount to the balance.
  - \`Budget.calculateBalance()\`: Returns the current balance.

### Example Usage:
\`\`\`javascript
Budget.addIncome(2000);    // Adds income
Budget.addExpense(500);    // Adds expense
Budget.calculateBalance(); // Returns the remaining balance
\`\`\`

### Requirements:
- Keep track of income and expenses.
- Calculate the remaining balance after adding income and expenses.

### Languages:
- JavaScript, Python, Java, Go
    `,
    languages: ["JavaScript", "Python", "Java", "Go"],
    difficulty: "medium",
    cloneCount: 0,
    tags: ["finance", "budget", "tracking"],
  },
  {
    title: "Simple Chat Application",
    shortDescription:
      "Create a basic chat application for users to send messages.",
    description: `
### Task:
Design a \`Chat\` class to simulate sending and receiving messages.

- **Methods**:
  - \`Chat.sendMessage(sender, receiver, message)\`: Sends a message from one user to another.
  - \`Chat.receiveMessage(receiver)\`: Retrieves the last message received by a user.

### Example Usage:
\`\`\`javascript
Chat.sendMessage('Alice', 'Bob', 'Hello Bob!');
Chat.receiveMessage('Bob');  // Returns the last message Bob received
\`\`\`

### Requirements:
- Allow users to send and receive messages.

### Languages:
- JavaScript, Python, Java, Go
    `,
    languages: ["JavaScript", "Python", "Java", "Go"],
    difficulty: "medium",
    cloneCount: 0,
    tags: ["chat", "messaging", "OOP"],
  },
  {
    title: "Task Manager",
    shortDescription:
      "Build a simple task manager to handle tasks and deadlines.",
    description: `
### Task:
Create a \`Task\` class with properties like \`name\`, \`deadline\`, and \`completed\`.

- **Methods**:
  - \`Task.addTask(name, deadline)\`: Adds a new task.
  - \`Task.removeTask(id)\`: Removes a task.
  - \`Task.completeTask(id)\`: Marks a task as completed.

### Example Usage:
\`\`\`javascript
Task.addTask('Submit Assignment', '2024-12-01');  // Adds a new task
Task.completeTask(1);  // Marks task as completed
\`\`\`

### Requirements:
- Manage tasks and deadlines.
- Mark tasks as complete and remove them when done.

### Languages:
- JavaScript, Python, Java, Go
    `,
    languages: ["JavaScript", "Python", "Java", "Go"],
    difficulty: "medium",
    cloneCount: 0,
    tags: ["task management", "OOP", "deadline tracking"],
  },
  {
    title: "Flashcard App",
    shortDescription:
      "Create an app that allows users to learn through flashcards.",
    description: `
### Task:
Design a \`Flashcard\` class that stores questions and answers for studying.

- **Methods**:
  - \`Flashcard.addCard(question, answer)\`: Adds a new flashcard.
  - \`Flashcard.getCard(id)\`: Retrieves a flashcard by its ID.
  - \`Flashcard.reviewCard(id)\`: Allows a user to review the answer to a flashcard.

### Example Usage:
\`\`\`javascript
Flashcard.addCard('What is JavaScript?', 'A programming language');
Flashcard.reviewCard(1);  // Displays the answer to the first card
\`\`\`

### Requirements:
- Allow users to add, review, and track flashcards.

### Languages:
- JavaScript, Python, Java, Go
    `,
    languages: ["JavaScript", "Python", "Java", "Go"],
    difficulty: "medium",
    cloneCount: 0,
    tags: ["education", "flashcards", "OOP"],
  },
  {
    title: "Recipe Finder",
    shortDescription: "An app to search for recipes based on ingredients.",
    description: `
### Task:
Create a \`Recipe\` class to store recipe names and ingredients. Design a search feature to find recipes based on available ingredients.

- **Methods**:
  - \`Recipe.addRecipe(name, ingredients)\`: Adds a new recipe.
  - \`Recipe.searchRecipes(ingredients)\`: Searches for recipes that contain the specified ingredients.

### Example Usage:
\`\`\`javascript
Recipe.addRecipe('Pasta', ['noodles', 'tomato sauce']);
Recipe.searchRecipes(['tomato sauce']);  // Returns recipes with tomato sauce
\`\`\`

### Requirements:
- Allow users to search for recipes by ingredients.
- Store and display recipes based on ingredients.

### Languages:
- JavaScript, Python, Java, Go
    `,
    languages: ["JavaScript", "Python", "Java", "Go"],
    difficulty: "medium",
    cloneCount: 0,
    tags: ["recipe", "search", "ingredients"],
  },
  {
    title: "Number Reverser",
    description: `
### Project:
Build an app that reverses the digits of a number.

### Features:
- Input a number.
- Reverse the digits of the number and display it.

### Languages:
- JavaScript, Python, Java, Go
    `,
    difficulty: "easy",
    languages: ["JavaScript", "Python", "Java", "Go"],
  },
];

export default ideas;
