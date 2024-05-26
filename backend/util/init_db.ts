import { Sequelize, DataTypes } from 'sequelize';

export default function defineTables(seq: Sequelize) {
    const Users = seq.define('Users', {
        user_id: {
            type: DataTypes.UUIDV4,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        posts: {
            type: DataTypes.ARRAY(DataTypes.UUIDV4),
            allowNull: true,
            references: {
                model: 'Posts',
                key: 'post_id'
            
            }
        }
    });

    const Posts = seq.define('Posts', {
        post_id: {
            type: DataTypes.UUIDV4,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_author: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'user_id'
            },
        },
        community: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'Communties',
                key: 'community_id'
            }
        }
    });

    const Communties = seq.define('Communities', {
        community_id: {
            type: DataTypes.UUIDV4,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        posts: {
            type: DataTypes.ARRAY(DataTypes.UUIDV4),
            allowNull: true,
            references: {
                model: 'Posts',
                key: 'post_id'
            }
        }
    });
}