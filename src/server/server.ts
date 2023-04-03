import express from "express";
import "reflect-metadata";
import bodyParser from 'body-parser';
import path from 'path';
import * as dotenv from "dotenv";

import {default as pingRouter} from './ping/routes';
import {default as applicationsRouter} from './applications/routes';
import {default as usersRouter} from './users/routes';
import {default as vehiclesRouter} from './vehicles/routes';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', pingRouter);
app.use('/api', applicationsRouter);
app.use('/api', usersRouter);
app.use('/api', vehiclesRouter);
app.get('/api/*', (req, res) => {
    res.status(404).send();
});

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
