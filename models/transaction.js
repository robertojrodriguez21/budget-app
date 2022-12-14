'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Account, { foreignKey: 'accountId' })
      Transaction.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Transaction.init(
    {
      name: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'user',
          key: 'id'
        }
      },
      accountId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'accounts',
          key: 'id'
        }
      },
      date: DataTypes.DATE,
      amount: DataTypes.DOUBLE
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions'
    }
  )
  return Transaction
}
