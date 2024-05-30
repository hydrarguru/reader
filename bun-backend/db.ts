import { Sequelize, QueryTypes } from "sequelize";
import { usersTable } from "./models/User";
import { postsTable } from "./models/Post";
import { communitiesTable } from "./models/Community";

const databaseSchema = [
    usersTable,
    postsTable,
    communitiesTable
];

async function addForeignKey(targetTable: string, targetColumn: string, referenceTable: string, referenceColumn: string): Promise<void> {
    Client.query(`ALTER TABLE ${targetTable} ADD FOREIGN KEY (${targetColumn}) REFERENCES ${referenceTable}(${referenceColumn})`);    
}

export const Client = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: console.log
});

export async function createTables() {
    for (const table of databaseSchema) {
        await Client.query(table);
    }
    await addForeignKey("Posts", "post_author", "Users", "user_id");
    await addForeignKey("Posts", "community_id", "Communities", "community_id");
};

export async function getAll(table: string) {
    const [results, metadata] = await Client.query(`SELECT * FROM ${table}`);
    console.log('Metadata: ' + metadata);
    console.log('Results: ' + JSON.stringify(results));
    return results;
}

export async function getOne(table: string, column: string, value: string | number): Promise<object | null> {
    const [results, metadata] = await Client.query(`SELECT * FROM ${table} WHERE ${column} = :value`, {
        type: QueryTypes.SELECT,
        replacements: { value: value }
    });
    console.log('Metadata: ' + metadata);
    console.log('Results: ' + JSON.stringify(results));
    if (results === undefined || results === null) {
        return null;
    }
    else {
        return results;
    }
}

