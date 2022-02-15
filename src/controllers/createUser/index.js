const User = require('../../models/user')


async function signIn(req, res) {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const username = req.body.username;
    const senha = req.body.senha;

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