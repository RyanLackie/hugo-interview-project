## How to setup
To setup after pulling the repo locally:
- Run `npm i` within the base of the project directory
- DB Stuff
    - Create a `.env` using the `example.env` file and filling in any info that may be different when connecting to your locally hosted db
        - This project is set up to run mysql/mariadb
        - The `DB_NAME` value in the `.env` can be any name that you do not currently have a database being called
    - To create a new database using a built in script run `ts-node src/server/db/createDb`
    - (Not Required) To supply the app with some basic data run `ts-node src/server/db/createData`
- Then run `npm run dev`
- The project should be visable at `http://localhost:3000/`
- To run the project's tests, run `npm run test`
    - (Sorry, ordinarily I would have written more but a general pattern I use can be seen in the "Ping" page directory)

## About the project
Hi, thanks for checking out the project :wave:
The front end is built using React + TypeScript and the back end uses Express + TypeScript + TypeORM for database management.
Tests are also written in TypeScript and run using Jest.

- At the base route `http://localhost:3000/` a home page should be visable. From here a new application can be started by clicking "Start Application".
- Clicking that should bring you to a new page with the path `/api/applications/:applicationId` for your new application.
- Updating
    - Updating the application is done by making changes and then selecting "Save Changes". Iterating on this project a save call could be auto made in the background if there were changes to the application state since the last save attempt. "Submit" will also save changes but will return a "price" for the plan and in the future could redirect the user to a checkout page.
    - In the backend the updating is handled by a PUT application endpoint `/api/applications/:applicationId` along with the nested user and vehicle objects using TypeORM.
- Creating
    - Creating new Users and Vehicles for an application can be done with the "Add User" and "Add Vehicle" buttons.
    - The creation of new User and Vehicle objects are handled through their own endpoints however these could be removed and the PUT application endpoint located at the url `/api/applications/:applicationId` could handle these through the front end supplying it with a new empty User or Vehicle object without an id field
- Deleting
    - Deleting Users and Vehicles for an application can be done with the 2 "Delete" buttons.
    - The deletion of new User and Vehicle objects are handled through their own endpoints DELETE `/api/users/:userId` and `/api/vehicles/:vehicleId`
- Data logic can be found in the controller file for the related named folder within the server directory
    - IE: `src/server/users/controller` contains funtions for interacting and validating user objects
