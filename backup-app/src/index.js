const pool = require("./postgresql");
const {
  mongodbInsert,
  mongodbConnect,
  mongodbDisconnect
} = require("./mongodb");
const axiosPost = require("./postRequest")

const format = (dateTime) => dateTime < 10 ? "0" + dateTime : dateTime;

// VPS Server is 1 hour behind Amsterdam time.
const correctHours = (hours) => hours + 1;

const makeSnapshot = async () => {
  const date = new Date();
  const currentDate = `${format(date.getDate())}-${format(date.getMonth() + 1 > 12 ? 1 : date.getMonth() + 1)}-${date.getFullYear()}`;
  const currentTime = `${format(correctHours(date.getHours()))}:${format(date.getMinutes())}:${format(date.getSeconds())}`;

  try {
    const pages = await pool.query("SELECT * FROM pages ORDER BY id")
    const document = {
      date: currentDate,
      time: currentTime,
      ...pages.rows,
    }
    mongodbInsert(document, `${currentDate} ${currentTime}`)

  } catch (error) {
    axiosPost(`${currentDate} ${currentTime} | Failed to query at PostgreSQL server:\n${error}`)
    console.error(`${currentDate} ${currentTime} | Failed to query at PostgreSQL server:\n${error}`);
  }
};

const mongodbConnection = mongodbConnect().then((result) => result);

if (mongodbConnection) {
  makeSnapshot();

  setInterval(makeSnapshot, 900000);

  mongodbDisconnect();
}