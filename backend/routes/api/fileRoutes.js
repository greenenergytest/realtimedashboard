const express = require('express');
const router = express.Router();
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

router.get('/files/read', async (req, res) => {
  const accessToken = req.session.accessToken;
  const filename = req.query.filename;

  console.log('in the backend');
  console.log(filename);
  if (!accessToken) {
    return res.redirect('/auth/signin');
  }

  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  try {
    // Get the files in the user's drive or specific team site
    const files = await client.api('/me/drive/root/children').get();
    const file = files.value.find((file) => file.name === filename);

    if (!file) {
      return res.status(404).send('File not found');
    }

    // Get the content of the file
    const fileContent = await client
      .api('/me/drive/items/${file.id}/content')
      .get();
    res.send(fileContent);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
