# Two-Player Trivia Battle Game

**Requirements**
- A modern web browser (Chrome, Firefox, Edge, Safari)  
- Active internet connection to fetch trivia questions  
- Basic understanding of HTML and JavaScript to customize or extend the game  
- No backend setup required (fully client-side application)  

**Technologies Used**
- **HTML** for structuring the game UI (forms, questions, options, leaderboard)  
- **Vanilla JavaScript** for game logic, turn handling, scoring, and state management  
- **Fetch API** for retrieving trivia questions asynchronously  
- **The Trivia API** as the question data source  

**About the API**
- **The Trivia API**
  - Used to fetch quiz questions by category and difficulty  
  - Questions are fetched separately for **easy**, **medium**, and **hard** levels  
  - Example endpoint:  
    `https://the-trivia-api.com/v2/questions?categories={category}&difficulties={level}&limit=2`
  - Each response includes:
    - Question text  
    - Correct answer  
    - Incorrect answers  
    - Difficulty level  

**Features Implemented**
- Two-player mode with name validation  
- Turn-based gameplay with automatic player switching  
- Category selection with prevention of repeat categories  
- Difficulty-based scoring system:
  - Easy → 10 points  
  - Medium → 15 points  
  - Hard → 20 points  
- Randomized answer options for every question  
- Visual feedback for correct (green) and incorrect (red) answers  
- Live score tracking for both players  
- Round-based gameplay with category summaries  
- Final leaderboard with winner/tie detection  
- Loader indicator while fetching questions  

**Application Flow**
- Players enter names and start the game  
- One category is selected per round  
- Questions are fetched for all difficulty levels  
- Players answer questions alternately  
- Scores are updated based on correctness and difficulty  
- After each category, a summary leaderboard is shown  
- Players can choose another category or end the game  
- Final leaderboard displays the overall winner  

**Notes**
- All game logic runs on the client side  
- API calls are handled asynchronously with proper error handling  
- Designed as a learning project to practice:
  - Asynchronous JavaScript  
  - DOM manipulation  
  - State management  
  - Turn-based logic  

**Possible Enhancements**
- Add a timer for each question  
- Support more than two players  
- Store high scores using localStorage  
- Add sound effects and animations  
- Improve mobile responsiveness  
