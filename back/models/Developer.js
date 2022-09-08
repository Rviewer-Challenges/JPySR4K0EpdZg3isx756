const { Schema, model } = require('mongoose');

const DeveloperSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    gitHub:
    {
        gitUser: String,
        avatar_url: String,
        html_url: String,
        bio: String,
        public_repos: Number,
        followers: Number,
        repositories:
            [{
                name: String,
                html_url: String,
                description: String,
                language: String,
            }]

    },
    twitter:{
        username: String,
        followers:Number,
        tweet_count: Number,
        description: String,
        tweets:[{
            text: String
        }]


    }
})



module.exports = model('Developer', DeveloperSchema);
