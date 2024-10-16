//write npm command line to install mocha
//npm install --global mocha

//command to run this test file
//mocha test.js

const assert = require('assert');
const http = require('http');
const server = require('./nodeserver');

describe('Node Server', () => {
    it('should return "key not passed" if key is not passed', (done) => {
        http
        .get('http://localhost:3000/get' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'key not passed');
                done();
            });
        });
    });

    //add test to check get when key is equal to world
    it('should return "Hello World" if key is world', (done) => {
        http
        .get('http://localhost:3000/get?key=world' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'hello world');
                done();
            });
        });
    });

    //add test to check validatephoneNumber
    it('should return "valid" if phone number is +34123456789', (done) => {
        http
        .get('http://localhost:3000/validatePhoneNumber?phoneNumber=%2B34123456789' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'valid');
                done();
            });
        });
    });


    //write test to validate validateSpanishDNI
    it('should return "valid" if DNI is 12345678Z', (done) => {
        http
        .get('http://localhost:3000/validateSpanishDNI?dni=12345678Z' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'valid');
                done();
            });
        });
    });
   

    //write test for returnColorCode red should return code #FF0000
    it('should return "#FF0000" if color is red', (done) => {
        http
        .get('http://localhost:3000/returnColorCode?color=red' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, '#FF0000');
                done();
            });
        });
    });


   //write test for daysBetweenDates
    it('should return "Days between dates: 2" if date1 is 2020-01-01 and date2 is 2020-01-03', (done) => {
        http
        .get('http://localhost:3000/daysBetweenDates?date1=2020-01-01&date2=2020-01-03' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Days between dates: 2');
                done();
            });
        });
    });

    //write test for invalid dates
    it('should return "Invalid dates" if date1 is invalid', (done) => {
        http
        .get('http://localhost:3000/daysBetweenDates?date1=invalid&date2=2020-01-03' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Invalid dates');
                done();
            });
        });
    });

    //write test for invalid dates
    it('should return "Invalid dates" if date2 is invalid', (done) => {
        http
        .get('http://localhost:3000/daysBetweenDates?date1=2020-01-01&date2=invalid' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Invalid dates');
                done();
            });
        });

    });

});
