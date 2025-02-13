# Emojie

Emojie is a web app that predicts a movie based on the emojis entered by the user. Built using Fresh.js, Deno, and Redis.

## Technologies Used

- **Fresh.js**: A modern web framework for building fast, server-rendered applications.
- **Deno**: A secure runtime for JavaScript and TypeScript, powering the backend.
- **Redis**: Used for caching and fast data retrieval.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Cicolas/Emojie.git
   cd Emojie
   ```

2. install dependencies using Deno:
   ```bash
   deno task start
   ```


3. Create .env, following the shape of .env.example

4. Start the application:
    ```bash
    deno run --allow-net --allow-env --unstable main.ts

    Open your browser and visit http://localhost:8000 to start predicting movies with emojis!
    ```

## Usage

    Enter a sequence of emojis that represent the movie you're thinking of, and Emojie will predict the movie for you.
