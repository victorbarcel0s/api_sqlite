
require("dotenv").config();
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const allUsers = require('./controllers/allUsersController')
const signUp = require('./controllers/createUser')
const updateUser = require('./controllers/updateUser')
const deleteUser = require('./controllers/deleteUser')
const signIn = require('./controllers/login')
const getProducts = require('./controllers/produtosController')
const swaggerUI = require("swagger-ui-express")
const specs = require('./swagger')
const verifyJWT = require('./controllers/authController') //para autenticações
const port = 3000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/users', allUsers) //lista todos os usuários cadastrados
app.get('/produtos', verifyJWT, getProducts); // lista todos os produtos recebidos pelo crawler, depende de autenticação
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs)) //TODO: implementar documentação decente
app.post('/signUp', signUp) // cria usuário
app.post('/signIn', signIn) // loga e retorna bearerToken
app.post('/updateUser', verifyJWT, updateUser) //atualiza informações de determinado usuario. depende de autenticação
app.delete('/deleteUser', verifyJWT, deleteUser) //exlui determinado usuário, depende de autenticação



app.listen(port, () => console.log(`Api rodando na porta ${port}!`))



