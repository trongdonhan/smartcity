module.exports = function (sourcefile, namefile, idWD, idVi) {
  const fs = require('fs');
  const readline = require('readline');
  const { google } = require('googleapis');
  const async = require('async');

  const con = require('../controller/connectDB')





  // If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.

  // const TOKEN_PATH = './controller/configurationDrive/main/token.json';  //main 
  const TOKEN_PATH = './controller/configurationDrive/test/token.json'; //test

  // Load client secrets from a local file.
  // fs.readFile('./controller/configurationDrive/main/credentials.json', (err, content) => {  //main
  fs.readFile('./controller/configurationDrive/test/credentials.json', (err, content) => { //test
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), uploadfile);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  // upload file to Drive
  function uploadfile(auth) {
    const drive = google.drive('v3');
    const filesMetadata = {
      'name': namefile
    }

    const media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(sourcefile)
    }

    drive.files.create({
      auth: auth,
      resource: filesMetadata,
      media: media,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        //Cấp quyền cho mọi người
        var permissions = [
          {
            'type': 'anyone',
            'role': 'reader'
          }
        ];
        // Using the NPM module 'async'
        async.eachSeries(permissions, function (permission, permissionCallback) {
          drive.permissions.create({
            auth: auth,
            resource: permission,
            fileId: file.data.id,
            fields: 'id',
          }, function (err, res) {
            if (err) {
              // Handle error...
              console.error(err);
              permissionCallback(err);
            } else {
              permissionCallback();
            }
          });
        }, function (err) {
          if (err) {
            // Handle error
            console.error(err);
          } else {
            // All permissions inserted
          }
        });
        if (idVi == null){
          //insert image for workdaily
          con.query("INSERT INTO `images`(`id`, `url`, `id_WD`) VALUES ('" + file.data.id + "', 'https://drive.google.com/file/d/" + file.data.id + "/preview', '" + idWD + "')", (err) => {
          if (err) throw err
          else
            console.log('thanh cong' + namefile)
        })
        } else {
          con.query("INSERT INTO `images`(`id`, `url`, `id_Vi`) VALUES ('" + file.data.id + "', 'https://drive.google.com/file/d/" + file.data.id + "/preview', '"+ idVi +"')", (err) => {
          if (err) throw err
          else
            console.log('thanh cong' + namefile)
        })
        }
       
        
      }
    });
  }
}
