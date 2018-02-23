const jwt = require("jwt-simple");
const cfg = require("../../JWTconfig.js");
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
		//console.log(req.body.values);
		const {
			email,
			firstName,
			secondName,
			password,
		} = req.body.values;

		if ( await User.findOne({email}) ) {
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
    updatePassword: async (req, res) =>{
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
        
        
        
        
    }
}

module.exports = routes;



/*
async function(error, result, fields) {
				if(error) {
					console.log(error.message);
					res.status(500).json({
						result: "Server Error "
					});
				}
				if ( result.length == 1 ) {
					if ( await checkPass(password, result[0].password, result[0].salt ) ) {
						let payload = { id: result[0].PlayerID };
						//console.log('Server: Login Success');
						res.cookie('blrstkn',jwt.encode(payload, cfg.jwtSecret), {path:'/'});
						res.status(200).json({result: true});
						return;
					}
				} 
				//console.log('Server: Login Failure');
				res.status(401).json({result: false});
			}

*/