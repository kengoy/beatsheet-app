# Beat Sheet App
This is an app that allows users to input and modify a YouTube influencer's beat sheet. 

## Prerequisites

- [Install Node.js and npm](https://nodejs.org/en/download/) v18.10.0 (npm 9.5.1) or higher
- [Install Docker](https://www.docker.com/)

## How to run this app
### Step.1 Start the backend
Clone the service from https://github.com/fmatar/beatsheet-exercise

  ```sh
  git clone git@github.com:fmatar/beatsheet-exercise.git
  ```

Start the docker containers in the cloned repo:

  ```sh
  docker compose create
  docker compose start
  ```


### Step.2 Run this app

On another terminal, run the app with the following commands.

  ```sh
  npm install
  npm run build
  npm start
  ```

The app should be accessible on http://localhost:3000 on your browser.

When you done playing around, make the container down when you leave.  Please note that any data not stored in a volume will be lost.

`docker-compose down`

## Features
- Basic
  - Fetch Acts/Beats data from the server
  - Edit an existing Beat
  - Add a new Beat in a Act
  - Delete a Beat in a Act
  - Add a new Act
  - Delete an Act
- UX
  - Accordion to expand/collapse Acts
  - Horizontal Scrolling for the Beats in an Act
  - Night Mode
  - Seemless Animation
  - Responsive UI
  - Pre-loading Effect
  - Act/Beat Edit Form Validation Check
  - Mouse-Hover Effect
- Performance
  - Server Side Rendering for initial loading with data prefetch
  - Client Side Rendering for Less-Steps CRUD interactions 
- Future Ideas
  - Navigation for different features access
  - Search Acts/Beats that contain keywords (Not Implemented Yet)
  - Team Collaboration (Mock UI implemented)

## Tech Stacks
- Next JS w/ TypeScript
- TanStack Query(React Query)
- TailwindCSS
- Headless UI
- React Hook Form
