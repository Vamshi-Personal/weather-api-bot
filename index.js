const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const bot111 = require('./bot111');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3970, function() {
    console.log(`Bot server listening to ${server.url}`);
});

const adapter = new BotFrameworkAdapter({
   
});

let bot;
try {
    bot = new bot111();
    console.log('MyBot instance created successfully');
} catch (error) {
    console.error('Error creating MyBot instance:', error);
}

server.post('/api/messages', (req, res, next) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
        next(); 
    });
});
 

