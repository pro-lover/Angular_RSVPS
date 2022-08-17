const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		shortName: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
		lastEditedBy: { type: DataTypes.INTEGER, allowNull: true },
		//editLock: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
	};

	const options = {
		// disable default timestamp fields (createdAt and updatedAt)
		timestamps: true,
		paranoid: true,
		createdAt: 'created',
		updatedAt: 'updated',
		// Enable optimistic locking.  When enabled, sequelize will add a version count attribute
  		// to the model and throw an OptimisticLockingError error when stale instances are saved.
		// Set to true or a string with the attribute name you want to use to enable.
		version: true
	};

	return sequelize.define('gender', attributes, options);
}
