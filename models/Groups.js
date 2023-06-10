module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define("groupMaster", {
        name: {
            type: DataTypes.STRING(100),
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

    Groups.associate = (models) => {
        Groups.hasMany(models.groupMembers, {
            foreignKey: 'groupId',
            as: 'groupMembers',
            onDelete: "cascade"
        });

        Groups.belongsTo(models.userMaster, {
            foreignKey: 'adminId',
            as: 'user',
            onDelete: "cascade"
        });
    };

    return Groups
}