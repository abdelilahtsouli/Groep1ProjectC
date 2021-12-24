const {
  MongoClient
} = require('mongodb');
const sendMail = require("./mailService");
const settings = require("../appsettings.json");

const uri = `mongodb+srv://${settings.MongoDB.user}:${settings.MongoDB.password}@${settings.MongoDB.cluster}.5prih.mongodb.net/${settings.MongoDB.database}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mongodbConnect = async () => {
  let succes = undefined;

  client.connect((err) => {
    if (err) {
      console.error(`Failed to connect to MongoDB server:\n${err}`);
      succes = false;
    }
    succes = true;
  });

  return succes;
}

const mongodbDisconnect = () => client.close();

const mongodbInsert = (document, timestamp) => {
  try {
    const collection = client.db(settings.MongoDB.database).collection(settings.MongoDB.collection);
    collection.insertOne(document);
    console.log(`${timestamp} | Upload Succeeded: Document has been added.`);
  } catch (error) {
    sendMail(settings.Outlook.user, `${timestamp} | Upload Failed`, error);
    console.error(`${timestamp} | Upload Failed:\n${error}`);
  }
};

module.exports = {
  mongodbInsert,
  mongodbConnect,
  mongodbDisconnect,
};