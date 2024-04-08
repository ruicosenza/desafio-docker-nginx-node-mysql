const express = require('express')
const app = express()
const faker = require('faker')
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'desafiofcdockerdb'
};

const mysql = require('mysql');
var connection = mysql.createConnection(config);
const selectSql = `SELECT * FROM PESSOA`;

selectResultPromise = (con) => {
  return new Promise((resolve, reject) => {
    con.query(selectSql, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

app.get('/', async (req, res) => {
  
  try {
    const name = faker.name.findName();
    const insertSql = `INSERT INTO PESSOA(NOME) VALUES("${name}")`;
    connection.query(insertSql);
//    connection.end();

    var connection2 = mysql.createConnection(config);
    const resultadoQuery = await selectResultPromise(connection2)
    var html = `<h1>FULL CYCLE ROCKS!!</h1>
                  <ul>
                    ${resultadoQuery.map(r => `<li>${r.NOME}</li>`)}
                  </ul>
                `
//    connection2.end();
  } finally {
    res.send(html)
  }
})

app.listen(port, () => {
  console.log('Desafio full cycle up')
})
