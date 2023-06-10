module.exports = (sequelize, DataTypes) => {
    const GroupMembers = sequelize.define("groupMembers", {
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
            validate: {
                notEmpty: true
            }
        },
    })

    GroupMembers.associate = (models) => {
        GroupMembers.belongsTo(models.userMaster, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: "cascade"
        });

        GroupMembers.belongsTo(models.groupMaster, {
            foreignKey: 'groupId',
            as: 'group',
            onDelete: "cascade"
        });

        GroupMembers.hasMany(models.splitExpense, {
            foreignKey: 'groupMemberId',
            as: 'groupMember',
            onDelete: "cascade"
        });

        GroupMembers.hasMany(models.expenseMaster, {
            foreignKey: 'groupMemberId',
            as: 'groupMember',
            onDelete: "cascade"
        });
    };

    return GroupMembers
}