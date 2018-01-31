const sha = require('sha256');
module.exports = async function( password, passwordHash, passwordSalt) {
    let pw = sha( password + passwordSalt);     
    for(var round = 0; round < 65536; round++) { 
        pw = await sha( pw + passwordSalt); 
    }
    if ( pw == passwordHash ) {
        //console.log("pw is true")
        return true;
    } else {
        //console.log("pw is false")
        return false;
    }
}