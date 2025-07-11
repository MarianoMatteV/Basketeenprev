const express = require('express');
const cors = require('cors');
//definir a porta
const porta = 3001;
const app = express();
//habilitar o cors e utilizar json
app.use(cors());
app.use(express.json());
//testar
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));

const connection = require('./db_config');


// Cadastrar Usuário

app.post('/usuario/cadastrar', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.idade,
        request.body.email,
        request.body.senha,
        request.body.status
    );
 console.log(params)
    let query = "INSERT INTO usuario(nome, idade, email, senha, status) values(?,?,?,?,?);";
   
    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Sucesso no cadastro",
                data: results
            })
 
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro no cadastro",
                data: err
            })
        }
    })
});


// Login Usuário

app.post('/usuario/login', (request, response) => {
    let params = Array(
        request.body.email
    );
    let query = "SELECT id,nome,idade,email,senha,status FROM usuario WHERE email = ?";
 
    connection.query(query, params, (err, results) => {
        if(results.length > 0) {
            let senhaDigitada = request.body.senha
            let senhaBanco = results[0].senha

            if (senhaBanco === senhaDigitada) {

                response
                    .status(201)
                    .json({
                        success: true,
                        message: "Sucesso",
                        data: results[0]
                })
                
            } else {
                response
                    .status(400)
                    .json({
                    success: false,
                    message: "Verifique sua senha!",
                    data: err
                })
            }

        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "E-mail não cadastrado",
                data: err
            })
        }
       
    })
})