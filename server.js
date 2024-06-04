const express = require('express');
const axios = require('axios');
const qs = require('qs');
const app = express();
const cors = require('cors');
const port = 3000;

const client_id = '7535566166492469';
const client_secret = 'ec80f1f7fabae9c1cef94d900359bde8';
const redirect_uri = 'https://97fb-110-227-248-96.ngrok-free.app/auth/callback';

app.use(cors()); // Add this line to enable CORS

app.get('/auth/instagram', (req, res) => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', qs.stringify({
      client_id,
      client_secret,
      grant_type: 'authorization_code',
      redirect_uri,
      code
    }));

    const accessToken = tokenResponse.data.access_token;
    const userId = tokenResponse.data.user_id;

    const userProfileResponse = await axios.get(`https://graph.instagram.com/${userId}?fields=id,username&access_token=${accessToken}`);

    res.send(userProfileResponse.data);
  } catch (error) {
    res.send(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});