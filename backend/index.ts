import express from 'express';
import { Sequelize } from 'sequelize';
import init_db  from './util/init_db';
//import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 8080;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

//app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


init_db(sequelize);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});