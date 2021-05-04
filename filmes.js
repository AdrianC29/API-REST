const express = require('express');
const router = express.Router();
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host           : 'localhost',
    user           : 'root',
    password       : '200429',
    database       : 'api_filmes'
})

pool.getConnection((err, connection) => {
    if(err) return console.log(err);
    console.log('Conectado ao banco de dados MySQL!');
})

router.get('/lista-filmes', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('SELECT * from filmes', (err, rows) => {
            connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    })
})

router.post('/adicionar-filme', (req, res) => {

    const nome_filme = req.body.nome_filme

    pool.getConnection((err, connection) => {
        connection.query(`INSERT INTO filmes(nome_filme) VALUES('${nome_filme}')`, (err, rows) => {
            connection.release()

            if(!err){
                res.send(`Filme "${nome_filme}" inserido no sistema!`)
            }else{
                console.log(err)
            }
        })
    })
})

router.post('/adicionar-filme-avaliacao', (req, res) => {
    
    const nome_filme = req.body.nome_filme
    const avaliacao = req.body.avaliacao

    pool.getConnection((err, connection) => {
        connection.query(`INSERT INTO filmes(nome_filme, avaliacao) VALUES('${nome_filme}', ${avaliacao})`, (err, rows) => {
            connection.release()

            if(!err){
                res.send(`Filme "${nome_filme}" inserido no sistema!\nAvaliação: ${avaliacao}`)
            }else{
                console.log(err)
            }
        })
    })
})

router.delete('/deletar-filme', (req, res) => {
    
    const nome_filme = req.body.nome_filme

    pool.getConnection((err, connection) => {
        connection.query('DELETE from filmes WHERE nome_filme = ?', [nome_filme], (err, rows) => {
            connection.release()

            if(!err){
                res.send(`Filme "${nome_filme}" excluído do sistema!`)
            }else{
                console.log(err)
            }
        })
    })
})

router.put('/atualizar-filme', (req, res) => {
    
    const nome_filme = req.body.nome_filme
    const avaliacao = req.body.avaliacao

    pool.getConnection((err, connection) => {
        connection.query('UPDATE filmes SET avaliacao = ? WHERE nome_filme = ?', [avaliacao, nome_filme], (err, rows) => {
            connection.release()

            if(!err){
                res.send(`Filme "${nome_filme}" atualizado no sistema!\nAvaliação: ${avaliacao}`)
            }else{
                console.log(err)
            }
        })
    })
})

router.get('/filmes-sem-avaliacao', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('SELECT * from filmes WHERE avaliacao IS NULL', (err, rows) => {
            connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    })
})

module.exports = router