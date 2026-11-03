// imports .env variables so we dont put password in js files
require('dotenv').config()

//set up mastodon libary
const m = require('masto')


//setting up the masto variable to connect to:
//1. the url to mastodon server
//2. the token (password to our account)

const masto = m.createRestAPIClient({
    url: 'https://networked-media.itp.io/',
    accessToken: process.env.TOKEN,
});

//async function to make a request to our mastodon server
async function makeStatus(text) {
    //await ensures that it creates the status before we do anyting else in our code
    const status = await masto.v1.statuses.create({
        status: text,
        //change visibility to public when project is ready to run
        visibility: 'private',
    });
}


setInterval(() => {
    // array of emojis to select
    let emoji = ['😭', '🤩', '💖'];
    //randomly generate a number in the array list
    let rand = Math.floor(Math.random() * emoji.length);
    //select an emoji from the array using a random index
    let post = emoji[rand];
    // make our status with an emoji
    makeStatus(post);
}, 5000); //happening every 5 seconds 