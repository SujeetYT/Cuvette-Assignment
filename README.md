# Cuvette Assignment Local Setup

Follow these steps to set up the application on your local machine.

## Prerequisites

- Node.js
- npm
- Git

## Installation

### Server Setup

1. **Open another terminal and change directory:**
  ```bash
  cd server
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Create a `.env` file:**
  Copy the `.env.example` file to `.env` and update the environment variables as needed.
  ```bash
  cp .env.example .env
  ```

4. **Run the server:**
  ```bash
  npm start
  ```

5. **Verify the server is running:**
  The server should be running on `http://localhost:5000`.


<br/>
<br/>
<hr/>

### Client Setup

1. **Clone the repository:**
  ```bash
  git clone https://github.com/SujeetYT/Cuvette-Assignment.git
  cd cuvette/client
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Create a `.env` file:**
  Copy the `.env.example` file to `.env` and update the environment variables as needed.
  ```bash
  cp .env.example .env
  ```

4. **Run the development server:**
  ```bash
  npm start
  ```

5. **Open your browser:**
  Navigate to `http://localhost:3000` to see the application running.

