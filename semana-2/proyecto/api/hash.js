const bcrypt = require('bcryptjs');

bcrypt.hash('123456', 10).then(hash => {
    console.log("INSERT INTO usuarios (email, password) VALUES ('test@correo.com', '" + hash + "');");
});