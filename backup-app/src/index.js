const pool = require("./postgresql");
const {
  mongodbInsert,
  mongodbConnect,
  mongodbDisconnect
} = require("./mongodb");
const sendMail = require("./mailService");

const format = (dateTime) => dateTime < 10 ? "0" + dateTime : dateTime;

const makeSnapshot = async () => {
  const date = new Date();
  const currentDate = `${format(date.getDate())}-${format(date.getMonth())}-${date.getFullYear()}`;
  const currentTime = `${format(date.getHours())}:${format(date.getMinutes())}:${format(date.getSeconds())}`;

  try {
    const pages = await pool.query("SELECT * FROM pages ORDER BY id")
    const document = {
      date: currentDate,
      time: currentTime,
      ...pages.rows,
    }
    mongodbInsert(document, `${currentDate} ${currentTime}`)

  } catch (error) {
    sendMail(settings.Outlook.user, `${timestamp} | Failed to query at PostgreSQL server`, error);
    console.error(`${currentDate} ${currentTime} | Failed to query at PostgreSQL server:\n${error}`);
  }
};

if (mongodbConnect()) {
  makeSnapshot();

  // setInterval(makeSnapshot, 1800000);
  setInterval(makeSnapshot, 600000);

  mongodbDisconnect();
}