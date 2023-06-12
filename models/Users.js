module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("userMaster", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING(100),

        },
        profilePic: {
            type: DataTypes.STRING,
        },
        upi: {
            type: DataTypes.STRING(100),
        },
        phone: {
            type: DataTypes.STRING(50),
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
            validate: {
                notEmpty: true
            }
        },
    })

    Users.associate = (models) => {
        Users.hasMany(models.groupMembers, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: "cascade"
        });

        Users.hasMany(models.groupMaster, {
            foreignKey: 'adminId',
            as: 'admin',
            onDelete: "cascade"
        });
    };

    return Users
}