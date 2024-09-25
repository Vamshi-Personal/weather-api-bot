/* const { ActivityHandler } = require('botbuilder');
const MyBot = require('./MyBot');

class bot111 extends ActivityHandler {
    constructor() {
        super();
        this.bot = new MyBot();

        this.onMessage(async (context, next) => {
            try {
                const weatherData = await this.bot.getDataFromAPI(); // Fetch data
                
                await context.sendActivity(`API response: ${JSON.stringify(weatherData)}`);
            } catch (error) {
                console.error('Error:', error);
                await context.sendActivity('There was an error with the API request.');
            }
            await next();
        });
    }
}

module.exports = bot111;
 */




/* const { ActivityHandler } = require('botbuilder');
const MyBot = require('./MyBot');

class bot111 extends ActivityHandler {
    constructor() {
        super();
        this.bot = new MyBot();

        this.onMessage(async (context, next) => {
            try {
                const weatherData = await this.bot.getDataFromAPI(); // Fetch data
                
                const time = weatherData.data.time;
                const temperature = weatherData.data.values.temperature;
                const humidity = weatherData.data.values.humidity;
                
                const location = weatherData.location.name;
                // Create a user-friendly message
                const message = `Current weather in ${location}:\n` +
                                `Time: ${time}\n` +
                                `Temperature: ${temperature}°C\n` +
                                `Humidity: ${humidity}%\n`;
                await context.sendActivity(message);
            } catch (error) {
                console.error('Error:', error);
                await context.sendActivity('There was an error with the API request.');
            }
            await next();
        });
    }
}

module.exports = bot111;
 */

/* const { ActivityHandler } = require('botbuilder');
const MyBot = require('./MyBot');

class bot111 extends ActivityHandler {
    constructor() {
        super();
        this.bot = new MyBot();

        this.onMessage(async (context, next) => {
            const userMessage = context.activity.text.trim();
            const city = userMessage; // Assume the user message is the city name

            try {
                const weatherData = await this.bot.getDataFromAPI(city); // Fetch data for the city
                
                // Log the entire response to understand its structure
                console.log('API response:', weatherData);

                // Adjust based on the actual API response structure
                const temperature = weatherData?.data?.values?.temperature || 'N/A';
                const weatherCode = weatherData?.data?.values?.weatherCode || 'N/A';
                const humidity = weatherData?.data?.values?.humidity || 'N/A';
                const windSpeed = weatherData?.data?.values?.windSpeed || 'N/A';

                // Create a response based on the weather data
                const weatherInfo = `
                    City: ${city}
                    Temperature: ${temperature} °C
                    Weather Code: ${weatherCode}
                    Humidity: ${humidity}%
                    Wind Speed: ${windSpeed} km/h
                `;

                await context.sendActivity(`Weather details for ${city}: ${weatherInfo}`);
            } catch (error) {
                console.error('Error:', error);
                await context.sendActivity('There was an error with the API request or parsing the response.');
            }
            await next();
        });
    }
}

module.exports = bot111;
 */



// const { ActivityHandler, CardFactory } = require('botbuilder');
// const MyBot = require('./MyBot');
// const fs = require('fs');
// const path = require('path');

// class Bot111 extends ActivityHandler {
//     constructor() {
//         super();
//         this.bot = new MyBot();
//         this.state = {
//             waitingForCity: false // To keep track of whether the bot is waiting for a city name from the user.
//         };

//         // Handle when new members are added to the conversation
//         this.onMembersAdded(async (context, next) => {
//             for (const member of context.activity.membersAdded) {
//                 if (member.id !== context.activity.recipient.id) {
//                     await context.sendActivity('Hi! How can I assist you today?');
//                     this.state.waitingForCity = false; // Reset state
//                 }
//             }
//             await next();
//         });

//         // Handle user messages
//         this.onMessage(async (context, next) => {
//             if (this.state.waitingForCity) {
//                 await this.handleCityRequest(context);
//             } else {
//                 await this.handleInitialMessage(context);
//             }
//             await next();
//         });
//     }

//     async handleInitialMessage(context) {
//         const userMessage = context.activity.text.toLowerCase();
//         if (userMessage.includes('weather') || userMessage.includes('city')) {
//             await context.sendActivity('If you need weather details for a city, please provide the city name.');
//             this.state.waitingForCity = true; // // if this is true , bot sends a prompt asking for a city name , User enters the city and click on get weather and then it will call the handleCityRequest.
//             await this.sendCityPrompt(context);
//         } else {
//             await context.sendActivity('I am not sure what you mean. Please let me know if you need weather details for a city.');
//         }
//     }

//     async handleCityRequest(context) {
//         if (context.activity.value && context.activity.value.action === 'getWeather') {
//             const city = context.activity.value.city;

//             if (city) {
//                 try {
//                     const weatherData = await this.bot.fetchWeatherData(city); // Fetch weather data
                    
//                     console.log('API response:', weatherData);

//                     // Extract relevant weather details from weather data
//                     const temperature = weatherData?.data?.values?.temperature || 'N/A';
//                     const weatherCode = weatherData?.data?.values?.weatherCode || 'N/A';
//                     const humidity = weatherData?.data?.values?.humidity || 'N/A';
//                     const windSpeed = weatherData?.data?.values?.windSpeed || 'N/A'; 
                    
//                     // Create a response message with the weather details
//                     const weatherInfo = `
//                         City: ${city}
//                         Temperature: ${temperature} °C
//                         Weather Code: ${weatherCode}
//                         Humidity: ${humidity}%
//                         Wind Speed: ${windSpeed} km/h
//                     `;

//                     await context.sendActivity(`Weather details for ${city}: ${weatherInfo}`);

//                     // Prompt for another city
//                     await context.sendActivity('Would you like to check the weather for another city? If so, please provide the city name.');
                    
//                     // Reset state to wait for a new city
//                     this.state.waitingForCity = true;
//                     await this.sendCityPrompt(context);
//                 } catch (error) {
//                     console.error('Error:', error);
//                     await context.sendActivity('There was an error with the API request or parsing the response.');
//                 }
//             } else {
//                 await context.sendActivity('Please enter a valid city name.');
//                 await this.sendCityPrompt(context);
//             }
//         } else {
//             await context.sendActivity('I’m not sure what you mean. Please let me know if you need weather details for a city.');
//             await this.sendCityPrompt(context);
//         }
//     }

//     async sendCityPrompt(context) {
//         try {
//             const cardPath = path.join(__dirname, 'cards', 'cityPromptCard.json');
//             const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//             const adaptiveCard = CardFactory.adaptiveCard(cardTemplate);

//             await context.sendActivity({
//                 attachments: [adaptiveCard]
//             });

//             console.log('Adaptive Card sent successfully');
//         } catch (error) {
//             console.error('Error sending Adaptive Card:', error);
//             await context.sendActivity('There was an error loading the Adaptive Card.');
//         }
//     }
// }

// module.exports = Bot111;


const { ActivityHandler } = require('botbuilder');
const { handleCityRequest, sendCityPrompt } = require('./messageHandlers');

class Bot111 extends ActivityHandler {
    constructor() {
        super();

        // Handle when new members are added to the conversation
        this.onMembersAdded(async (context, next) => {
            for (const member of context.activity.membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity('Hi! How can I assist you today? If you want to know the weather details for any city, please enter the city name in the prompt.');
                    await sendCityPrompt(context); // Prompt user to enter city name
                }
            }
            await next();
        });

        // Handle user messages
        this.onMessage(async (context, next) => {
            if (context.activity.value && context.activity.value.city) {
                await handleCityRequest(context);
            }
            await next();
        });
    }
}

module.exports = Bot111;
