import { DataTypes } from "sequelize";
import { Client } from '../db';
import { Post } from './Post';

export const Community = Client.define('Community', {
    community_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});