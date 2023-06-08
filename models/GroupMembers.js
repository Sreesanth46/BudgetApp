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
        GroupMembers.hasOne(models.userMaster, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: "cascade"
        });

        GroupMembers.hasOne(models.groupMaster, {
            foreignKey: 'groupId',
            as: 'group',
            onDelete: "cascade"
        });
    };

    return GroupMembers
}