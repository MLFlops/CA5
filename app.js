const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
    user: 'bms',
    host: 'db', //name of the database service defined in docker-compose.yml
    database: 'mlflops', 
    password: 'mlflops123',
    port: 5432
  });

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Signup Page</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f0f0;
            }
            .container {
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 100%;
                text-align: center;
            }
            .form-group {
                margin-bottom: 20px;
                text-align: left;
            }
            input {
                width: 100%;
                padding: 8px;
                margin-top: 6px;
                box-sizing: border-box;
            }
            button {
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
            button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Welcome to Signup Page!</h2>
            <form action="/signup" method="post">
                <div class="form-group">
                    <label for="username">Username</label><br>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label><br>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <button type="submit">Signup</button>
                </div>
            </form>
        </div>
    </body>
    </html>
  `);
});

app.post('/signup', async(req, res) => {
    const { username, password } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, password]);
        const insertedUserId = result.rows[0].id;
        client.release();
        res.send(`User signed up successfully!<br>Username: ${username}<br>Inserted User ID: ${insertedUserId}`);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting user');
      }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
