const Routes = require("next-routes");

module.exports = Routes()
.add('index')
.add('channel','/:slug.:id','channel')
.add('podcasts','/:slugChannel.:id/:slug.:id','podcasts');