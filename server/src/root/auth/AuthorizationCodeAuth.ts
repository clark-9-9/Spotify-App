//- Type of Authorization (Authorization Code Flow)
import { Request, Response } from "express";
import request from "request";
import cookieParser from "cookie-parser";
import queryString from "node:querystring";



const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8080/callback";
// const REDIRECT_URI = "http://my-music-app.com/callback";


interface AuthResponse {
    state: string;
    code?: string;
    error?: string;
}


function generateRandomString(length: number): string {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
  
  
// function Login(req: Request, res: Response) {
//     const state: string = generateRandomString(16);
//     const scope = process.env.SCOPE;  

//     const queryParams = {
//         response_type: 'code',
//         client_id: CLIENT_ID,
//         scope: scope,
//         redirect_uri: REDIRECT_URI,
//         state: state      
//     }

//     const url: string = queryString.stringify(queryParams);
//     res.redirect('https://accounts.spotify.com/authorize?' + url);
// }

const stateKey = 'spotify_auth_state';

async function Login(req: Request, res: Response) {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    const queryParams = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
    };

    const url: string = queryString.stringify(queryParams);
    console.log(req.query, "Login route"); 
    const authUrl = `https://accounts.spotify.com/authorize?${url}`;
    res.redirect(authUrl);
}


async function Callback(req: Request, res: Response) {
    const code = req.query.code || null;
    const state = req.query.state || null;

    

    if(state === null || code === null) {
        res.redirect('/#' +
        queryString.stringify({
          error: 'authorization_failed'
        }));
    } else {
        const tokenEndpoint = "https://accounts.spotify.com/api/token"; 
        const authHeader = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
        const authOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": authHeader
            },
            body: queryString.stringify({
                code: code as string,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        }

        const response = await fetch(tokenEndpoint, authOptions);
        const data = await response.json();
        console.log(response.ok);
        
        res.json({ data, code, state });
    }
}




/* async function Callback(req: Request, res: Response) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
  
    console.log(code);
    console.log(state);
    

    if (state === null || state !== storedState) {
      res.redirect('/#' +
        queryString.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' +  new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there
          res.redirect('/#' +
            queryString.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            queryString.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
}
*/    

/*
async function Callback(req: Request, res: Response) {
    const code = req.query.code || null;
    const state = req.query.state || null;
  
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        // Convert form data to a URL-encoded string
        form: queryString.stringify({
          code: code as string,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
        }),
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        json: true,
    };
      
    try {
        const response = await fetch(authOptions.url, { method: 'POST', body: authOptions.form, headers: authOptions.headers });
        const data = await response.json();
        console.log(data); // Access token, token type, etc.
        return res.json(data); // Respond with the data
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
            
}
*/





































// async function Callback(req: Request, res: Response) {
//     const tokenEndpoint = 'https://accounts.spotify.com/api/token';
//     const code = req.query.code || null;
//     const state = req.query.state || null;


//     console.log(req.query, "callback route"); 


//     if (state === null) {
//         const error = queryString.stringify({
//             error: 'state_mismatch'
//         })
 
//         return res.redirect('/#' + error);
//     } else {
//         if (typeof code !== 'string') return res.status(400).json({ error: 'Code parameter is missing' });

//         const body: URLSearchParams | string = new URLSearchParams({
//             code: code,
//             redirect_uri: REDIRECT_URI,
//             grant_type: 'authorization_code'
//         });


//         const authOptions = {
//             method: "POST",
//             headers: {
//                 "Content-type": "application/x-www-form-urlencoded",
//                 "Authorization": 'Basic ' +  Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
//             },

//             body: body
//         }

//         const response = await fetch(tokenEndpoint, authOptions);
//         const data = await response.json();

//         console.log(response, data, "Res, Data");
        

//         return res.json({ data })
//     }
// }



export { Login, Callback };









/* 

    const scope: string = `
        ugc-image-upload

        user-read-playback-state
        user-modify-playback-state
        user-read-currently-playing

        app-remote-control
        streaming

        user-read-email 
        user-read-private 
        
        playlist-read-private 
        playlist-read-collaborative
        playlist-modify-private 
        playlist-modify-public 

        user-follow-modify
        user-follow-read

        user-read-playback-position
        user-top-read
        user-read-recently-played
        
        user-library-modify 
        user-library-read
        
        user-follow-modify
        user-follow-read

        user-read-playback-state
        user-modify-playback-state
        user-read-currently-playing       
        
        user-soa-link
        user-soa-unlink
        user-manage-entitlements
        user-manage-partner
        user-create-partner        
    `;  

*/


/* 

 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'CLIENT_ID'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret
var redirect_uri = 'REDIRECT_URI'; // Your redirect uri

 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);

*/