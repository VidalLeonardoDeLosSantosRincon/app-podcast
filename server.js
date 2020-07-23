const Next  = require("next");
const Routes = require("./routes");
const App = Next({dev: process.env.NODE_ENV !== "production"});
const Handler = Routes.getRequestHandler(App);
const Port = process.env.PORT || 3000;

const {createServer} = require("http");
App.prepare().then(()=>{
    createServer(Handler).listen(Port);
});