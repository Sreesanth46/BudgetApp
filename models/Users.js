module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("user_master", {
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

    // Users.associate = (models) => {
    //     Users.hasOne(models.login_master, {
    //         foreignKey: 'userId',
    //         as: 'auth',
    //         onDelete: "cascade"
    //     });
    // };

    return Users
}