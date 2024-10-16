const http = require('http');
const url = require('url');
const fs = require('fs');
const axios = require('axios');
const readline = require('readline');
const stream = require('stream');

// Function to handle GET requests
const handleGetRequest = (req, res, parsedUrl) => {
    const pathname = parsedUrl.pathname;
    const queryObject = parsedUrl.query;

    switch (pathname) {
        case '/get':
            handleGetMethod(req, res, queryObject);
            break;
        case '/daysBetweenDates':
            handleDaysBetweenDates(req, res, queryObject);
            break;
        case '/validatePhoneNumber':
            handleValidatePhoneNumber(req, res, queryObject);
            break;
        case '/validateSpanishDNI':
            handleValidateSpanishDNI(req, res, queryObject);
            break;
        case '/returnColorCode':
            handleReturnColorCode(req, res, queryObject);
            break;
        case '/tellMeAJoke':
            handleTellMeAJoke(req, res);
            break;
        case '/moviesByTitle':
            handleMoviesByTitle(req, res, queryObject);
            break;
        case '/parseUrl':
            handleParseUrl(req, res, queryObject);
            break;
        case '/listFiles':
            handleListFiles(req, res);
            break;
        case '/getFullTextFile':
            handleGetFullTextFile(req, res);
            break;
        case '/getLineByLineFromTextFile':
            handleGetLineByLineFromTextFile(req, res);
            break;
        case '/calculateMemoryConsumption':
            handleCalculateMemoryConsumption(req, res);
            break;
        case '/randomEuropeanCountry':
            handleRandomEuropeanCountry(req, res);
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('method not supported');
    }
};

// Handle /get endpoint
const handleGetMethod = (req, res, queryObject) => {
    const key = queryObject.key;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(key ? `hello ${key}` : 'key not passed');
};

// Handle /daysBetweenDates endpoint
const handleDaysBetweenDates = (req, res, queryObject) => {
    const date1 = new Date(queryObject.date1);
    const date2 = new Date(queryObject.date2);

    if (!isNaN(date1) && !isNaN(date2)) {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Days between dates: ${diffDays}`);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid dates');
    }
};

// Handle /validatePhoneNumber endpoint
const handleValidatePhoneNumber = (req, res, queryObject) => {
    const phoneNumber = queryObject.phoneNumber;
    const phoneRegex = /^\+34\d{9}$/;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(phoneRegex.test(phoneNumber) ? 'valid' : 'invalid');
};

// Calculate the letter for a given DNI number
const calculateDNILetter = (dniNumber) => {
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const remainder = dniNumber % 23;
    return letters.charAt(remainder);
};

// Validate a Spanish DNI
const validateSpanishDNI = (dni) => {
    const dniRegex = /^\d{8}[A-Z]$/;
    if (!dniRegex.test(dni)) {
        return false;
    }
    const number = parseInt(dni.slice(0, 8), 10);
    const letter = dni.charAt(8);
    return calculateDNILetter(number) === letter;
};

// Handle /validateSpanishDNI endpoint
const handleValidateSpanishDNI = (req, res, queryObject) => {
    const dni = queryObject.dni;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (validateSpanishDNI(dni)) {
        res.end('valid');
    } else {
        res.end('invalid');
    }
};

// Handle /returnColorCode endpoint
const handleReturnColorCode = (req, res, queryObject) => {
    const color = queryObject.color;

    fs.readFile('colors.json', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        const colors = JSON.parse(data);
        const colorData = colors.find(c => c.color.toLowerCase() === color.toLowerCase());

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(colorData ? colorData.code.hex : 'Color not found');
    });
};

// Handle /tellMeAJoke endpoint
const handleTellMeAJoke = (req, res) => {
    axios.get('https://official-joke-api.appspot.com/random_joke')
        .then(response => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.data));
        })
        .catch(() => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        });
};

// Handle /moviesByTitle endpoint
const handleMoviesByTitle = (req, res, queryObject) => {
    const director = queryObject.director;
    const apiKey = 'your_api_key_here'; // Replace with your actual API key

    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${director}`)
        .then(response => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.data.Search));
        })
        .catch(() => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        });
};

// Handle /parseUrl endpoint
const handleParseUrl = (req, res, queryObject) => {
    const someurl = queryObject.someurl;
    const parsed = url.parse(someurl);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        protocol: parsed.protocol,
        host: parsed.host,
        port: parsed.port,
        path: parsed.path,
        query: parsed.query,
        hash: parsed.hash
    }));
};

// Handle /listFiles endpoint
const handleListFiles = (req, res) => {
    fs.readdir('.', (err, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(files));
    });
};

// Handle /getFullTextFile endpoint
const handleGetFullTextFile = (req, res) => {
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        const lines = data.split('\n').filter(line => line.includes('Fusce'));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(lines));
    });
};

// Handle /getLineByLineFromTextFile endpoint
const handleGetLineByLineFromTextFile = (req, res) => {
    const instream = fs.createReadStream('sample.txt');
    const outstream = new stream();
    const rl = readline.createInterface(instream, outstream);

    const lines = [];

    rl.on('line', (line) => {
        if (line.includes('Fusce')) {
            lines.push(line);
        }
    });

    rl.on('close', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(lines));
    });
};

// Handle /calculateMemoryConsumption endpoint
const handleCalculateMemoryConsumption = (req, res) => {
    const memoryUsage = process.memoryUsage();
    const memoryInGB = (memoryUsage.heapUsed / 1024 / 1024 / 1024).toFixed(2);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${memoryInGB} GB`);
};

// Handle /randomEuropeanCountry endpoint
const handleRandomEuropeanCountry = (req, res) => {
    const countries = [
        { name: 'Spain', iso: 'ES' },
        { name: 'France', iso: 'FR' },
        { name: 'Germany', iso: 'DE' },
        { name: 'Italy', iso: 'IT' },
        { name: 'Portugal', iso: 'PT' }
    ];

    const randomCountry = countries[Math.floor(Math.random() * countries.length)];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(randomCountry));
};

// Create the server and listen on the specified port
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET') {
        handleGetRequest(req, res, parsedUrl);
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('method not supported');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});