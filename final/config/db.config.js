module.exports = {
  HOST: 'localhost',
  USER: '<utilisateur base de donnees>',
  PASSWORD: '<mot de passe>',
  DB: '<nom base>',
  dialect: 'postgres ou mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
