import { create } from 'domain';
import { Sequelize, DataTypes } from 'sequelize';


export default function init_db(seq: Sequelize) {
    seq.query('PRAGMA foreign_keys = ON');

    seq.define('users', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_posts: {
            type: DataTypes.ARRAY(DataTypes.UUIDV4),
            allowNull: true,
            references: {
                model: 'posts',
                key: 'post_id'
            }
        },
    })

    seq.define('posts', {
        post_id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_author: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        post_community: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'community',
                key: 'community_id'
            }
        },
    })
    seq.define('community', {
        community_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        community_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        community_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        communty_posts: {
            type: DataTypes.ARRAY(DataTypes.UUIDV4),
            allowNull: true,
            references: {
                model: 'posts',
                key: 'post_id',
            }
        },
    })

    seq.sync({ force: true });
}