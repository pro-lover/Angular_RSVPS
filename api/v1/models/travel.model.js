const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
	const attributes = {
		arrivalDate: { type: DataTypes.DATE, allowNull: false },
        departureDate: { type: DataTypes.DATE, allowNull: false },
        arrivalNumber: { type: DataTypes.STRING, allowNull: false },
        departureNumber: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
		lastEditedBy: { type: DataTypes.INTEGER, allowNull: true }
	};

	const options = {
		// disable default timestamp fields (createdAt and updatedAt)
		timestamps: true,
		createdAt: 'created',
		updatedAt: 'updated',
		paranoid: true,
		// Enable optimistic locking.  When enabled, sequelize will add a version count attribute
  		// to the model and throw an OptimisticLockingError error when stale instances are saved.
		// Set to true or a string with the attribute name you want to use to enable.
		version: true,
	};

	return sequelize.define('travel', attributes, options);
}
