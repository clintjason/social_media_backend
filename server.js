// importe le paquet http de NodeJs
const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// défini le port d'écoute, en premier celui défini dans les variables d'environnement, sinon 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


//  récupererla valeur d'erreur 
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    // Autorisation non acceptée
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    // port utilisé
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};


// création du serveur en passant l'application express
const server = http.createServer(app);

server.on('error', errorHandler);

// affiche dans la console le port utilisé 
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Server running on port ' + bind);
});

// serveur en écoute
server.listen(port);