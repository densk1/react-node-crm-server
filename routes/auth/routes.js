const jwt = require("jwt-simple");
const cfg = require("../../config/JWTconfig.js");
const db = require('../../model/mysqlCon');
const checkPass = require('../../model/checkPass');

const mongoose = require('mongoose');
const User = mongoose.model('user');

const auth = {
	local: async (req, res) => {
		let { 
			emailAddress, 
			password,
			// stayLoggedIn
		} = req.body;
		const userExists = await User.findOne({email: emailAddress });
		if ( userExists ) {
			const {
				_id,
				firstName,
				secondName,
				email,
				admin,
				passwordHash,
				passwordSalt,
			} = userExists;
			if ( await checkPass(password, passwordHash, passwordSalt ) ) {
				let payload = { id: _id, email };
				res.cookie('blrstkn',jwt.encode(payload, cfg.jwtSecret), {path:'/'});
				return res.status(200).json({result: {firstName,secondName,email,admin}});
			}
		}
		return res.status(401).json({result: "login failed"});
	},
	checkLogin:	(req, res) => {
		const {
			firstName, secondName, email, admin
		} = req.user;
		return res.status(200).json({result: true, firstName, secondName, email, admin});
	},
	logout: (req, res) => {
		res.clearCookie('blrstkn', {path:'/'});
        res.status(200).json({result: true});  
        return;
	},
}

module.exports = auth ;