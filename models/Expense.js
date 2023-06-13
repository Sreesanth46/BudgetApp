module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define("expenseMaster", {
        name: {
            type: DataTypes.STRING(100),
        },
        amount: {
            type: DataTypes.INTEGER,
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

    Expense.associate = (models) => {
        Expense.belongsTo(models.groupMembers, {
            foreignKey: 'createdBy',
            as: 'createdUser',
            onDelete: "cascade"
        });

        Expense.belongsTo(models.groupMaster, {
            foreignKey: 'groupId',
            as: 'group',
            onDelete: "cascade"
        });

        Expense.hasMany(models.expenseSplit, {
            foreignKey: 'expenseId',
            as: 'expense',
            onDelete: "cascade"
        });
    };

    return Expense
}