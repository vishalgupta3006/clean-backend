const config = {
  app:{
    port: process.env.PORT || 8080
  },
  db:{
    connectionString: "mongodb+srv://admin:admin@cluster0.bqnzc.mongodb.net/cleanDB?retryWrites=true&w=majority"
  }
}
module.exports = config;