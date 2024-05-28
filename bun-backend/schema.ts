import { DataTypes } from "sequelize";

export const Community = {
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
    },
    community_posts: {
        type: DataTypes.UUID,
        allowNull: true,
        foreignKey: true,
        references: {
            model: "Post",
            key: "post_id"
        }
    }
}

export const Post = {
    post_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
    author_id: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
            model: "User",
            key: "user_id"
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    modifedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}

export const User = {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posts: {
        type: DataTypes.UUID,
        allowNull: true,
        foreignKey: true,
        references: {
            model: "Post",
            key: "post_id"
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    modifedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}

function setupAssociations(): void {
    Community.hasMany(Post, { foreignKey: "community_id" });
    Post.belongsTo(Community, { foreignKey: "community_id" });

    User.hasMany(Post, { foreignKey: "author_id" });
    Post.belongsTo(User, { foreignKey: "author_id" });
}