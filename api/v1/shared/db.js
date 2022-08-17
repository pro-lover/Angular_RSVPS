const path = require('path');
const config = require(path.join(__dirname, '../config.json'));
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const Temporal = require('sequelize-temporal');

module.exports = db = {};

initialize();

async function initialize() {

	const { host, port, user, password, database } = process.env.NODE_ENV === 'production' ? config.database.prod : config.database.local;

    //const { host, port, user, password, database } = config.database.local;

	// create db if it doesn't already exist

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, {
		host: host,
  		port: port,
		dialect: 'mysql',
		logging: false
	});

	db.sequelizeInstance = sequelize;

	/**
	 * ACCESS ACCOUNTS MODEL
	 */
	// init models and add them to the exported db object
	db.Account = require('../models/account.model')(sequelize);

	db.RefreshToken = require('../models/refresh-token.model')(sequelize);

	// define relationships
	db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
	db.RefreshToken.belongsTo(db.Account);

	/**
	 * DATA MODEL - Delegate
	 */
	db.Delegate = require('../models/delegate.model')(sequelize);

	/**
	 * DATA MODEL - Emergency Contact
	 */
	db.Emergency = require('../models/emergency.model')(sequelize);

	/**
	 * DATA MODEL - Country
	 */
	db.Country = require('../models/country.model')(sequelize);

	/**
	 * DATA MODEL - Diet
	 */
	db.Diet = require('../models/diet.model')(sequelize);

	/**
	 * DATA MODEL - Shirt Size
	 */
	db.ShirtSize = require('../models/shirt-size.model')(sequelize);

	/**
	 * DATA MODEL - Shoe Size
	 */
	 db.ShoeSize = require('../models/shoe-size.model')(sequelize);

	/**
	 * DATA MODEL - Office
	 */
	db.Office = require('../models/office.model')(sequelize);

	/**
	 * DATA MODEL - Travel Details
	 */
	db.Travel = require('../models/travel.model')(sequelize);

	/**
	 * DATA MODEL - Gender
	 */
	db.Gender = require('../models/gender.model')(sequelize);

	//
	db.Delegate.belongsTo(db.Country, { onDelete: 'NO ACTION' });
	db.Country.hasMany(db.Delegate);

	db.Delegate.belongsTo(db.ShirtSize, { onDelete: 'NO ACTION' });
	db.ShirtSize.hasMany(db.Delegate);

	//db.Delegate.belongsTo(db.ShoeSize, { onDelete: 'NO ACTION' });
	//db.ShoeSize.hasMany(db.Delegate);

	db.Delegate.belongsTo(db.Office, { onDelete: 'NO ACTION' });
	db.Office.hasMany(db.Delegate);

	db.Delegate.belongsTo(db.Diet, { onDelete: 'NO ACTION' });
	db.Diet.hasMany(db.Delegate);

	db.Emergency.belongsTo(db.Delegate, { onDelete: 'NO ACTION' });
	db.Delegate.hasMany(db.Emergency);

	//db.Delegate.belongsToMany(db.Diet, { through: 'dietaryRequirements', onDelete: 'NO ACTION' });
	//db.Diet.belongsToMany(db.Delegate, { through: 'dietaryRequirements', onDelete: 'NO ACTION' });

	db.Travel.belongsTo(db.Delegate, { onDelete: 'NO ACTION' });
	db.Delegate.hasMany(db.Travel);


	// sync all models with database
	await sequelize.sync();

	// Version History Table
	/**/
	//Temporal(db.Account, sequelize);


	/** /
	await sequelize.sync({
		alter: {
			drop: false
		}
	}).catch(function(err){
		console.log(err);
	});
	db.Delegate.sync({
		alter: {
			drop: false
		}
	}).catch(function(err){
		console.log(err);
	});
	/**/
}
