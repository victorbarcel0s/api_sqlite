const User = require('../../models/user')

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
async function deleteUSer(req, res) {
    const cpf = req.body.cpf;
    const senha = criptografar(req.body.senha);

    try {
        const user = await User.findByPk(cpf);
        if (user.senha == senha) {
            await user.destroy({ where: { cpf: cpf } })
            res.status(200).json('Deleted succesfully')
        } else {
            res.status(401).json('Unauthorized')

        }


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    ""
}
module.exports = deleteUSer