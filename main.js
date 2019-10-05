const Twitter = require('twitter')
const fs = require('fs')
const request = require('request')

const consumer_key = 'コンシューマーkey'
const consumer_secret = 'シークレットkey'
const access_token_key = 'アクセストークンkey'
const access_token_secret = 'アクセストークンシークレットkey'

const client = new Twitter({
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret
})

const params = {
    screen_name: '@ユーザーID',
    count: 200
}

client.get('favorites/list', params, function(error, tweets) {
    var link = []
    for (let i = 0; i < 150; i++) {
        try {
            for (let k = 0; k < tweets[i].extended_entities.media.length; k++) {
                link.push(tweets[i].extended_entities.media[k].media_url)
            }
        } catch (e) {
            console.log(`${e} --- not media or out of range`)
        }
    }

    for (let a = 0; a < 150; a++) {
        let filename = link[a].replace(/[^a-zA-Z0-9\.]+/g, '_')
        request.get(link[a]).pipe(fs.createWriteStream(filename))
    }
})
