const User = require('../../models/user')
const jwt = require('jsonwebtoken');
const {
    secret
} = process.env
const crypto = require("crypto");
const {
    CRYPTO_ALG,
    CRYPTO_SECRET, CRYPTO_TYPE
} = process.env
function criptografar(senha) {
    const cipher = crypto.createCipher(CRYPTO_ALG, CRYPTO_SECRET)
    cipher.update(senha);
    return cipher.final(CRYPTO_TYPE)
}
async function login(req, res) {
    const cpf = req.headers.cpf
    const password = criptografar(req.headers.password)
    console.log(cpf)
    console.log(password)

    try {
        const user = await User.findByPk(cpf);
        if (user.senha == password) {
            const token = jwt.sign({ cpf }, secret, {
                expiresIn: 900 // expira em 15min
            });
            return res.json({ auth: true, token: token });
        } else {
            res.status(401).json('Unauthorized')

        }



    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = login