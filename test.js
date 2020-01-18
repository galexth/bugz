require('dotenv').config();
let _ = require('lodash');
var object = { asdf: 'aadsdsa', 'b': '2', c: 3 };

console.log(_.pick(object, ['asdf', 'c']))