let mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
   title: {
       type: String,
       required: 'Title is Required'
   },
    date: {
        type: String,
        required: 'Date is Required'
    },
    author: {
        type: String,
        required: 'Author is Required'
    },
    description: {
        type: String,
        required: 'Description is Required'
    },
    body: {
        type: String,
        required: 'Body text is Requiered.'
    },
    mediasrc:{
        type: String
    },
    imagesrc:{
        type: String
    }
});

// make this model public
module.exports = mongoose.model('Article', articleSchema);