const fs = require('fs');
const path = require('path');
const config = require(path.join(__dirname, '../config.json'));

const nodemailer	= require('nodemailer');

//const SibApiV3Sdk = require('sib-api-v3-sdk');
//const defaultClient = SibApiV3Sdk.ApiClient.instance;

module.exports = sendEmail;

async function sendEmail({ to, subject, html }) {

	let transporter = nodemailer.createTransport({
		host: 'mail.africaconference.co.za',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: 'no-reply@africaconference.co.za', 	// generated ethereal user
			pass: 'd5{%he8(8IGh' 			// generated ethereal password
		}
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		//let info = transporter.sendMail({
			from: '"TBWA\\Africa Conference 2022" <no-reply@africaconference.co.za>', 	// sender address
			to: to,
			bcc: 'sibusiso@5ivedesign.co.za,zibone.mona@tbwa.co.za',
			subject: subject,
			text: '',
			html: html
			//to: 'sibusiso@5ivedesign.co.za, max.sibande@tbwa.co.za', // to
			//html: fs.readFileSync( path.join(__dirname, 'dist/index.html'), 'utf8')
			//text: 'Thanks for completing your additional information. Please remember to update your flight information as soon as you can, so we can organize transfers for you.', // plain text body


	});

	console.log('Message sent: %s', info.messageId);

	return info;

}

async function sendEmailOld({ to, subject, html }) {

	// Configure API key authorization: api-key
	let apiKey = defaultClient.authentications['api-key'];
	apiKey.apiKey = config.sendinblue.apiKey;

	let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

	let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
	sendSmtpEmail = {
		sender: {
			email: 'no-reply@africaconference.co.za',
			name: 'TBWA\\Africa Conference'
		},
		to: [{
			email: to
		}],
		subject: subject,
		htmlContent: html,
		//templateId: 59,
		//params: {
		//	name: 'Max',
		//	surname: 'Sibande'
		//},
		headers: {
			'api-key': config.sendinblue.apiKey,
			'content-type': 'application/json',
			'accept': 'application/json',
			//'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
		}
	};

	await apiInstance.sendTransacEmail(sendSmtpEmail).then( function(data) {
			//console.log('Email API called successfully. Returned data: ' + data);
		}, function(error) {
			console.error(error);
		}
	);

    //const transporter = nodemailer.createTransport(config.smtpOptions);
    //await transporter.sendMail({ from, to, subject, html });
}
