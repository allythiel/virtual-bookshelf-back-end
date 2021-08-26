const mongoose = require('mongoose');
const Joi = require('joi');


const commentSchema = new mongoose.Schema({
    text: { type: String, required: true, minLength: 5, maxLength: 1000},
    author: { type: String, required: true, minLength: 5, maxLength: 100},
    book: { type: String, required: true, minLength: 5, maxLength: 100},
    dateAdded: { type: Date, default: Date.now },
});

const bookshelfSchema = new mongoose.Schema({
    kind1: { type: String },
    bookshelf_id1: { type: String },
    etag1: { type: String },
    selfLink1: { type: String },
    volumeInfo1: {type: Object },
    saleInfo1: {type: Object },
    accessInfo1: {type: Object },
    searchInfo1: {type: Object },
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxLength: 100},
    password: { type: String, required: true, minLength: 5, maxLength: 20},
    email: { type: String, required: true, minLength: 5, maxLength: 50},
    comments: [commentSchema],
    bookshelf: [bookshelfSchema],
});

const bookSchema = new mongoose.Schema({
    kind2: { type: String },
    bookshelf_id2: { type: String },
    etag2: { type: String },
    selfLink2: { type: String },
    volumeInfo2: {type: Object },
    saleInfo2: {type: Object },
    accessInfo2: {type: Object },
    searchInfo2: {type: Object },
})


////////////////////////////////////////////////////////////////////////////
const Comment = mongoose.model("Comment", commentSchema);
const User = mongoose.model("User", userSchema);
const Bookshelf = mongoose.model("Bookshelf", bookshelfSchema);
const Book = mongoose.model("Book", bookSchema);

/////////////////////////VALIDATION//////////////////////////////////////////

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        password: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(user);
}

function validateComment(comment){
    const schema = Joi.object({
        text: Joi.string().min(5).max(1000).required(),
        author: Joi.string().min(5).max(100).required(),
        book: Joi.string().min(5).max(100).required()
    });
    return schema.validate(comment);
}

function validateBookshelf(bookshelf){
    const schema = Joi.object({
        kind: Joi.string(),
        book_id: Joi.string(),
        etag: Joi.string(),
        selfLink: Joi.string(),
        volumeInfo: {
            title: Joi.string(),
            authors: [Joi.string()],
            description: Joi.string().min(5).max(500),
            averageRating: Joi.number(),
            ratingsCount: Joi.number(),
            imageLinks: {
                smallThumbnail: Joi.string(),
                thumbnail: Joi.string()
            }
        }
    });
    return schema.validate(bookshelf);
}

////////////////////////////////////////////////////////////////////////////

module.exports = {
    User: User,
    Comment: Comment,
    Bookshelf: Bookshelf,
    validateUser: validateUser,
    validateComment: validateComment,
    validateBookshelf: validateBookshelf
}