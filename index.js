const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//update express settings
app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-for-urlencoded
app.use(bodyParser.json()); //parse application/json

app.get('/', (request, response) => {
response.send('Hello world');
});

app.get('/status', (request, response) => {
  response.status(200).json({ message:'ok', status: 200});
});

app.post('/signup', (request, response, next) => {
  if (!request.body) {
response.status(400).json({message:'invalid body', status: 400});
} else {
  response.status(200).json({message:'ok', status: 200});
}
});

app.get('/login', (request, response) => {
  if (!request.body) {
response.status(400).json({message:'invalid body', status: 400});
} else {
  response.status(200).json({message:'ok', status: 200});
}
});

app.get('/logout', (request, response) => {
  if (!request.body) {
response.status(400).json({message:'invalid body', status: 400});
} else {
  response.status(200).json({message:'ok', status: 200});
}
});

app.get('/token', (request, response) => {
  if (!request.body || !request.body.refreshToken) {
    response.status(400).json({message:'invalid body', status: 400});
  } else {
    const { refreshToken } = request.body;
  response.status(200).json({ message:`refresh token requested for token: ${refreshToken}`, status: 200});
}
});

app.get('/forgot-password', (request, response) => {
  if (!request.body || !request.body.email) {
    response.status(400).json({message:'invalid body', status: 400});
  } else {
    const { email } = request.body;
  response.status(200).json({ message:`forgot password requested for email: ${email}`, status: 200});
}
});

app.get('/reset-password', (request, response) => {
  if (!request.body || !request.body.email) {
    response.status(400).json({message:'invalid body', status: 400});
  } else {
    const { email } = request.body;
  response.status(200).json({ message:`password reset requested for email: ${email}`, status: 200});
}
});

//catch all other routes
app.use((request, response) => {
response.status(404).json({message: '404 - Nope, not found, sorry', status: 404});
});

//handle errors
app.use((error, request, response, next) => {
  console.log(error);
response.status(error.status || 500).json({error: error.message, status: 500});
});

app.listen(port, () =>{
  console.log(`server is up on port: ${port}`);
});
