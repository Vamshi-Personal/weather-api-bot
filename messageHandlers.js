const { CardFactory } = require('botbuilder');
const fs = require('fs');
const path = require('path');
const MyBot = require('./MyBot');

const botInstance = new MyBot(); // Create an instance of MyBot

async function handleCityRequest(context) {
    try {
        // Check if the activity contains a value from the Adaptive Card
        if (context.activity.value && context.activity.value.city) {
            const city = context.activity.value.city.trim();

            if (city) {
                try {
                    const weatherData = await botInstance.getDataFromAPI(city);

                    console.log('API response:', weatherData);

                    const temperature = weatherData.data.values.temperature;
                    const weatherCode = weatherData.data.values.weatherCode;
                    const humidity = weatherData.data.values.humidity;
                    const windSpeed = weatherData.data.values.windSpeed; 

                    const weatherInfo = `
                        City: ${city}
                        Temperature: ${temperature} °C
                        Weather Code: ${weatherCode}
                        Humidity: ${humidity}%
                        Wind Speed: ${windSpeed} km/h
                    `;

                    await context.sendActivity(`Weather details for ${city}: ${weatherInfo}`);

                    await context.sendActivity('Would you like to check the weather for another city? If so, please provide the city name.');
                    await sendCityPrompt(context); // Prompt for another city
                } catch (error) {
                    console.error('Error fetching data from API:', error);
                    await context.sendActivity('There was an error with the API request or parsing the response.');
                }
            } else {
                await context.sendActivity('Please enter a valid city name.');
                await sendCityPrompt(context); // Prompt user to re-enter city
            }
        } else {
            await context.sendActivity('I’m not sure what you mean. Please enter a city name.');
            await sendCityPrompt(context); // Prompt user to re-enter city
        }
    } catch (error) {
        console.error('Error in handleCityRequest:', error);
        await context.sendActivity('There was an error processing your request.');
    }
}

async function sendCityPrompt(context) {
    try {
        const cardPath = path.join(__dirname, 'cards', 'cityPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        const adaptiveCard = CardFactory.adaptiveCard(cardTemplate);

        await context.sendActivity({
            attachments: [adaptiveCard]
        });

        console.log('Adaptive Card sent successfully');
    } catch (error) {
        console.error('Error sending Adaptive Card:', error);
        await context.sendActivity('There was an error loading the Adaptive Card.');
    }
}

module.exports = {
    handleCityRequest,
    sendCityPrompt
};
