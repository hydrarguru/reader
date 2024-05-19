import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';

const app = express();
const port = 8080;
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

sequelize.query('PRAGMA foreign_keys = ON');




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});