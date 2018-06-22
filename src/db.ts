const MongoClient = require('mongodb').MongoClient;

class Db {
  client = null
  db = null

  connect() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve()
      } else {
        MongoClient
          .connect(process.env.mongoUrl)
          .then((client) => {
            this.client = client
            this.db = client.db(process.env.mongoDBName)
            console.log(`Connected to ${process.env.mongoDBName}`)
            resolve()
          }, (err) => {
            console.log('Error connecting: ', err.message)
            reject(err.message)
          })
      }
    })
  }

  close() {
    if (this.client) {
      this.client.close()
        .then(() => {
          console.log('Connection closed')
        }, (err) => {
          console.log('Failed to close DB ', err.message)
        })
    }
  }

  async insertMany(collectionName, documents) {
    const collection = await this.db.collection(collectionName)
    await collection.insertMany(documents)
  }
}

module.exports = Db;