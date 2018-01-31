const sha = require('sha256');
module.exports = async function( password, passwordHash, passwordSalt) {
    var pw = sha( password + passwordSalt);     
    for(var round = 0; round < 65536; round++) { 
        pw = await sha( pw + passwordSalt); 
    }
    // console.log(pw)
    if ( pw == passwordHash ) {
        return true;
    } else {
        return false;
    }
}