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

async function signIn(req, res) {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const username = req.body.username;
    const senha = criptografar(req.body.senha);

    try {
        await User.create({
            'nome': nome,
            'cpf': cpf,
            'email': email,
            'username': username,
            'senha': senha
        });
        res.status(200).json('Create succesfully')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    ""
}
module.exports = signIn