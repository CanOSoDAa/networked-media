
require("dotenv").config();

const m = require("masto");

const masto = m.createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN,
});

// Publish a Mastodon post
async function makeStatus(text) {
    const status = await masto.v1.statuses.create({
        status: text,
        visibility: "public",
    });
}

// Randomizer helper function
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Updated classmate names
let names = [
    "@Elena",
    "@Anita",
    "@Caitlyn",
    "@Anna",
    "@Sam",
    "@Tommy",
    "@Mike",
    "@Wing",
    "@Lam",
    "@Lisa",
    "@Yatong",
    "@Jennifer",
    "@Ali",
    "@May",
    "@Tess",
    "@Kiki"
];

// Automatically generate posts
setInterval(async () => {

    let url = "http://68.183.118.25:6003/get-data";

    // Check the current time in New York
    let hour = Number(new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        hourCycle: "h23"
    }));

    // Sleeping time: 12 AM to 8 AM
    if (hour < 8) {
        console.log("The squirrel agency is sleeping.");
        return;
    }

    try {
        let response = await fetch(url);
        let json = await response.json();

        let reports = json.filter(item => item.text);

        if (reports.length === 0) return;

        let report = pickRandom(reports).text;
        let name = pickRandom(names);

        let comments = [
            `Agent ${name}, please investigate this suspicious activity.`,
            `Agent ${name}, we need your expertise on this squirrel.`,
            `Agent ${name}, another mysterious squirrel case awaits.`,
            `Agent ${name}, please add this to our squirrel archives.`,
            `Agent ${name}, the threat level is suspiciously adorable.`
        ];

        let post = report + "\n\n" + pickRandom(comments);

        console.log(post);
        await makeStatus(post);

    } catch (error) {
        console.log(error.message);
    }

}, 900000); // Post every 15 minutes
