const {
  MongoClient
} = require('mongodb');
const settings = require("../appsettings.json");
const axiosPost = require("./postRequest")

const uri = `mongodb+srv://${settings.MongoDB.user}:${settings.MongoDB.password}@${settings.MongoDB.cluster}.5prih.mongodb.net/${settings.MongoDB.database}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mongodbConnect = async () => {
  let succes = undefined;

  client.connect((err) => {
    if (err) {
      axiosPost(`Failed to connect to MongoDB server:\n${err}`)
      console.error(`Failed to connect to MongoDB server:\n${err}`);
      succes = false;
    }

    axiosPost(`Succeeded to connect to MongoDB server`)
    console.log(`Succeeded to connect to MongoDB server`)
    succes = true;
  });

  return succes;
}

const mongodbDisconnect = () => client.close();

const mongodbInsert = (document, timestamp) => {
  try {
    const collection = client.db(settings.MongoDB.database).collection(settings.MongoDB.collection);
    collection.insertOne(document).then(
      (result) => {
        axiosPost(`${timestamp} | Upload Succeeded | Document has been added with ID: ${result.insertedId}`);
        console.log(`${timestamp} | Upload Succeeded | Document has been added with ID: ${result.insertedId}`);
      }
    );
  } catch (error) {
    axiosPost(`${timestamp} | Upload Failed:\n${error}`);
    console.error(`${timestamp} | Upload Failed:\n${error}`);
  }
};

module.exports = {
  mongodbInsert,
  mongodbConnect,
  mongodbDisconnect,
};