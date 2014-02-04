var tt = require('twitter-text')
  , uniq = require('lodash.uniq')
  , url = require('url')
  , maxHost = 38
  , maxPath = 16

function getUrl (u) {
  var parsed = url.parse(u)
    , host = parsed.hostname.replace(/^www\./, '')

  if (parsed.port && (parsed.port !== 80 && parsed.port !== 443)) {
    host += port
  }

  if (host.length > maxHost) {
    host = '…' + host.substring(host.length - maxHost + 1)
  }

  return parsed.path.length > maxPath ? (host + parsed.path.substring(0, maxPath - 1) + '…')
                                      : (host + parsed.path)
}

module.exports = function (text) {
  // Add entities to the end
  var entities = tt.extractEntitiesWithIndices(text)
    , terms = []

  entities.forEach(function (entity, i ) {
    text += ' '
    if (entity.url) {
      text += entity.url + ' ' + getUrl(entity.url)
    } else if (entity.hashtag) {
      text += entity.hashtag
    }
  })

  var lower = text.toLowerCase()
    , words = lower.split(/\s+/)

  words.forEach(function (word) {
    if (word.length > 1) {
      terms.push(word)

      var chars = /[@#]*[A-Za-z_0-9]+/g
        , match

      while (match = chars.exec(word)) {
        var c = match[0]
        terms.push(c)
        // if it starts with @ or #
        if (c.length > 1 && c.match(/^[@#]/)) {
          terms.push(c.substring(1))
        }
      }
    }
  })

  return uniq(terms)
}
