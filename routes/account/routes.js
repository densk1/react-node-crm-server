const jwt = require("jwt-simple");
const cfg = require("../../config/JWTconfig.js");
const db = require('../../model/mysqlCon');
const checkPass = require('../../model/checkPass');
const sha = require('sha256');

const mongoose = require('mongoose');
const User = mongoose.model('user');

const getSalt = () => {
	return Math.random().toString(36).slice(-10);
}

const createHash = async ( password, salt) => {
    let pw = sha( password + salt);     
    for(var round = 0; round < 65536; round++) { 
        pw = await sha( pw + salt); 
    }
	return pw;
}	

const routes = {
	adduser: async (req, res) => {
		const {
			email,
			firstName,
			secondName,
			password,
		} = req.body.values;

		if ( await User.findOne({email}) || !req.user.admin ) {
			return res.status(401).json({result: "User Exists!"});
		}
		const passwordSalt = await getSalt();
		const passwordHash = await createHash(password, passwordSalt);

		await new User({
			firstName,
			secondName,
			email,
			passwordHash,
			passwordSalt,
			admin: false,
			added: new Date(),
		}).save();
		
		return res.status(200).json({result: "User added."});
	},
    updatePassword: async (req, res) => {
        const {
            oldpassword,
            newpassword,
            newpasswordcheck,
        } = req.body;
        const { id } = req.user;
        try {
            let findUser = await User.findById({_id: id} );
            if ( findUser ) {
                const {
                    passwordHash,
                    passwordSalt,
                } = findUser;
                if ( await checkPass(oldpassword, passwordHash, passwordSalt ) ) {
                    const passwordSalt = await getSalt();
                    const passwordHash = await createHash(newpassword, passwordSalt);
                    let result = await User.findByIdAndUpdate({_id: id}, {passwordHash, passwordSalt})
                    return res.status(200).json(true)
                }
            } 
            return res.status(401).json(false);
        } catch (e) {
            console.log(e);
            return res.status(500).json(false);
        } 
    },
	getUsers: async (req, res) => {
		const {
			userID,
			admin,
		} =  req.body;
		
		if ( req.user.admin ) {
			try {
				let result = await User.find();
				return res.status(200).json({result})
			} catch (e) {
				return res.status(500).json(false);
			}
		}
		return res.status(401).json(false);
	},
	updateUser: async (req, res) => {
		const {
			userID
		} =  req.body;

		if ( req.user.admin && (userID !== req.user.id)  ) {
			try {
				const admin = req.body.admin ? false : true;
				let result = await User.findByIdAndUpdate({_id: userID}, {admin})
				const {
					_id,
					email,
					firstName,
					secondName,
				} = result;
				return res.status(200).json({
					_id,
					email,
					firstName,
					secondName,
					admin
				})
			} catch (e) {
				console.log(e)
				return res.status(500).json(false);
			}
		}
		return res.status(401).json(false);
	},
	deleteUser: async (req, res) => {
		const {
			delUserID, index
		} =  req.body;
		if ( req.user.admin && (delUserID !== req.user.id)  ) {
			try {
				/*let result = await User.remove({_id: delUserID }).exec();
				console.log(result);
				*/return res.status(200).json({delUserID, index});
			} catch (e) {
				console.log(e)
				return res.status(500).json(false);
			}
		}
		return res.status(401).json(false);
	}
}

module.exports = routes;