var h = require('./kweb');

h.globals.webFolder = './demo/';
h.html().listen(88, () => {
    console.log('Server running...');
});