// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // install with npm install node-fetch@2

const app = express();
app.use(bodyParser.json());

// Example KeyAuth configuration
const KEYAUTH_NAME = "SchoolUnblockerKeys";
const KEYAUTH_OWNERID = "FYv0xlPRAW";
const KEYAUTH_VERSION = "1.0";

app.post('/api/validateKey', async (req, res) => {
    const { key } = req.body;
    if (!key) return res.json({ success: false, message: 'No key provided' });

    try {
        const response = await fetch('https://keyauth.win/api/1.2/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'login',
                key,
                name: KEYAUTH_NAME,
                ownerid: KEYAUTH_OWNERID,
                ver: KEYAUTH_VERSION
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Server error: ' + err.message });
    }
});

app.use(express.static('public')); // serve your HTML from /public

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
