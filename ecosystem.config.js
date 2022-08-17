module.exports = {
	apps : [{
		name   : "HTTP_API_AFCON",
		script : "./afcon-webapp-api-server.js",
		env_production: {
			NODE_ENV: "production"
		},
		args   : "watch"
	}]
}
