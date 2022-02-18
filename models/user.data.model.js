var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
    png: String,/* image */
    description: String,/* description */
});
module.exports = DataSchema;