const axios = require("axios");

const axiosPost = (content) =>
  axios
  .post("https://discord.com/api/webhooks/925486984535879741/qNWCq9ewH0xDc_VpFyOZvYU6oV9BQLCDPReKAfiSDcYb96GFVTxx70H6iLpTlHOChFIa", {
    username: "Bounce by the Ounce Bot",
    avatar_url: "https://i.ytimg.com/vi/PzP1XC51kro/maxresdefault.jpg",
    content: content
  }, {
    headers: {
      "Content-type": "application/json"
    }
  })

module.exports = axiosPost;