# Beat Sheet App
This is an app that allows users to input and modify a YouTube influencer's beat sheet. 

## Prerequisites

- [Install Node.js and npm](https://nodejs.org/en/download/) v18.10.0 (npm 9.5.1) or higher
- [Install Docker](https://www.docker.com/)

## Step.1 Start the backend
Clone the service from https://github.com/fmatar/beatsheet-exercise

  ```sh
  git clone git@github.com:fmatar/beatsheet-exercise.git
  ```

Start the docker containers in the cloned repo:

  ```sh
  docker compose create
  ```


## Step.2 Run this app
### Run a frontend app

On another terminal, run the app with the following commands.

  ```sh
  npm install
  npm run dev
  ```

The app should be accessible on http://localhost:3000 on your browser.

When you done playing around, make the container down when you leave.  Please note that any data not stored in a volume will be lost.

`docker-compose down`
