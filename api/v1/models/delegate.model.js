const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
	const attributes = {
		email: { type: DataTypes.STRING, allowNull: false },
		designation: { type: DataTypes.STRING, allowNull: false },
		firstName: { type: DataTypes.STRING, allowNull: false },
		lastName: { type: DataTypes.STRING, allowNull: false },
		passportNumber: { type: DataTypes.STRING, allowNull: false },
		mobileno: { type: DataTypes.STRING, allowNull: false },
		//workno: { type: DataTypes.STRING, allowNull: false },
		medicalcondition: { type: DataTypes.STRING, allowNull: true },
		allergies: { type: DataTypes.STRING, allowNull: true },
		additionalDiet: { type: DataTypes.STRING, allowNull: true },
		otherOffice: { type: DataTypes.STRING, allowNull: true },
		shoesize: { type: DataTypes.STRING, allowNull: true },
		visaRequired: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		rsvp: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
		status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
		lastEditedBy: { type: DataTypes.INTEGER, allowNull: true }
	};

	const options = {
		//
		// disable default timestamp fields (createdAt and updatedAt)
		timestamps: true,
		createdAt: 'created',
		updatedAt: 'updated',
		// don't delete database entries but set the newly added attribute deletedAt
		// to the current date (when deletion was done). paranoid will only work if
		// timestamps are enabled
		paranoid: true,
		// Enable optimistic locking.  When enabled, sequelize will add a version count attribute
		// to the model and throw an OptimisticLockingError error when stale instances are saved.
		// Set to true or a string with the attribute name you want to use to enable.
		version: true
	};

	return sequelize.define('delegate', attributes, options);
}
