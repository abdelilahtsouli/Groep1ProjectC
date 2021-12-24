const pool = require("./postgresql");
const {
  mongodbInsert,
  mongodbConnect,
  mongodbDisconnect
} = require("./mongodb");

const format = (dateTime) => dateTime < 10 ? "0" + dateTime : dateTime;

const makeSnapshot = async () => {
  const pages = await pool.query("SELECT * FROM pages ORDER BY id")

  const date = new Date();
  const currentDate = `${format(date.getDate())}-${format(date.getMonth())}-${date.getFullYear()}`;
  const currentTime = `${format(date.getHours())}:${format(date.getMinutes())}:${format(date.getSeconds())}`;

  const document = {
    date: currentDate,
    time: currentTime,
    ...pages.rows,
  }
  mongodbInsert(document, `${currentDate} ${currentTime}`)
};

if (mongodbConnect()) {
  makeSnapshot();

  // setInterval(makeSnapshot, 1800000);
  setInterval(makeSnapshot, 60000);

  mongodbDisconnect();
}