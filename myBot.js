/* const { ActivityHandler } = require('botbuilder');
const request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class MyBot extends ActivityHandler {
    getDataFromAPI() {
        const apiKey = 'vb0zfqeW9asTxQVaAyYno1lc7UP6w9XI'; 
        const url = `https://api.tomorrow.io/v4/weather/realtime?location=miami&apikey=${apiKey}`;
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        return new Promise((resolve, reject) => {
            request.get(url, options, (error, response, body) => {
                if (error) {
                    console.error('Error fetching data from API:', error);
                    reject(error);
                } else if (response.statusCode !== 200) {
                    console.error(`HTTP error! status: ${response.statusCode}`);
                    reject(new Error(`HTTP error! status: ${response.statusCode}`));
                } else {
                    try {
                        const parsedBody = JSON.parse(body);
                        resolve(parsedBody);
                    } catch (parseError) {
                        reject(new Error('Failed to parse response body'));
                    }
                }
            });
        });
    }
}

module.exports = MyBot;
 */

//df7649dbbc0788801a22f2e4a8b43f95

/* New York
Los Angeles
Chicago
Miami
San Francisco
Seattle
Toronto
Vancouver
London
Paris
Berlin
Rome
Sydney
Tokyo
Beijing
Moscow
Dubai
Bangkok
Cape Town
Barcelona */



/* const { ActivityHandler } = require('botbuilder');
const request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class MyBot extends ActivityHandler {
    getDataFromAPI(city) {
        const apiKey = 'vb0zfqeW9asTxQVaAyYno1lc7UP6w9XI'; 
        const url = `https://api.tomorrow.io/v4/weather/realtime?location=${encodeURIComponent(city)}&apikey=${apiKey}`;
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        return new Promise((resolve, reject) => {
            request.get(url, options, (error, response, body) => {
                if (error) {
                    console.error('Error fetching data from API:', error);
                    reject(error);
                } else if (response.statusCode !== 200) {
                    console.error(`HTTP error! status: ${response.statusCode}`);
                    reject(new Error(`HTTP error! status: ${response.statusCode}`));
                } else {
                    try {
                        const parsedBody = JSON.parse(body);
                        console.log('API response:', parsedBody); // Log response for debugging
                        resolve(parsedBody);
                    } catch (parseError) {
                        reject(new Error('Failed to parse response body'));
                    }
                }
            });
        });
    }
}

module.exports = MyBot;
 */



// const { ActivityHandler } = require('botbuilder');
// const request = require('request');
// const WeatherAPI = require('./weatherAPI');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// class MyBot extends ActivityHandler {
//     getDataFromAPI(city) {
//         const apiKey = 'vb0zfqeW9asTxQVaAyYno1lc7UP6w9XI';
//         const url = `https://api.tomorrow.io/v4/weather/realtime?location=${encodeURIComponent(city)}&apikey=${apiKey}`;
//         const options = { method: 'GET', headers: { accept: 'application/json' } };

//         return new Promise((resolve, reject) => {
//             request.get(url, options, (error, response, body) => {
//                 if (error) {
//                     console.error('Error fetching data from API:', error);
//                     reject(error);
//                 } else if (response.statusCode !== 200) {
//                     console.error(`HTTP error! status: ${response.statusCode}`);
//                     reject(new Error(`HTTP error! status: ${response.statusCode}`));
//                 } else {
//                     try {
//                         const parsedBody = JSON.parse(body);
//                         console.log('API response:', parsedBody); // Log response for debugging
//                         resolve(parsedBody);
//                     } catch (parseError) {
//                         reject(new Error('Failed to parse response body'));
//                     }
//                 }
//             });
//         });
//     }
// }

// module.exports = MyBot;



const { ActivityHandler } = require('botbuilder');
const request = require('request');
const { apiKey, baseURL, options } = require('./Apiconfig');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class MyBot extends ActivityHandler {
    async getDataFromAPI(city) {
        const url = `${baseURL}?location=${encodeURIComponent(city)}&apikey=${apiKey}`;
        
        return new Promise((resolve, reject) => {
            request.get(url, options, (error, response, body) => {
                if (error) {
                    console.error('Error fetching data from API:', error);
                    reject(error);
                } else if (response.statusCode !== 200) {
                    console.error(`HTTP error! status: ${response.statusCode}`);
                    reject(new Error(`HTTP error! status: ${response.statusCode}`));
                } else {
                    try {
                        const parsedBody = JSON.parse(body);
                        console.log('API response:', parsedBody); // Log response for debugging
                        resolve(parsedBody);
                    } catch (parseError) {
                        reject(new Error('Failed to parse response body'));
                    }
                }
            });
        });
    }
    
}
    
module.exports = MyBot;
