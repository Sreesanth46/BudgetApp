module.exports = (sequelize, DataTypes) => {
    const ExpenseSplit = sequelize.define("expenseSplit", {
        splitAmount: {
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

    ExpenseSplit.associate = (models) => {
        ExpenseSplit.belongsTo(models.groupMembers, {
            foreignKey: 'groupMemberId',
            as: 'groupMember',
            onDelete: "cascade"
        });

        ExpenseSplit.belongsTo(models.expenseMaster, {
            foreignKey: 'expenseId',
            as: 'expense',
            onDelete: "cascade"
        });

    };

    return ExpenseSplit
}