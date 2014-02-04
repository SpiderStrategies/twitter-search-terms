var terms = require('./')
  , assert = require('assert')

describe('Twitter search terms', function () {

  it('parses terms for a search', function () {
    var results = terms('blue widget')

    assert.equal(results.length, 2)
    assert.equal(results[0], 'blue')
    assert.equal(results[1], 'widget')
  })

  it('parses a tweet', function () {
    var results = terms('Tweet example with #hashtag 日本語の中でEnglishを使う場合　＃日本語ハッシュタグ and http://alongurl.to/test_with_many_many_many_characters')

    assert.equal(results.length, 17)
    assert.deepEqual(results, [
      'tweet',
      'example',
      'with',
      '#hashtag',
      'hashtag',
      '日本語の中でenglishを使う場合',
      'english',
      '＃日本語ハッシュタグ',
      'and',
      'http://alongurl.to/test_with_many_many_many_characters',
      'http',
      'alongurl',
      'to',
      'test_with_many_many_many_characters',
      '日本語ハッシュタグ',
      'alongurl.to/test_with_many…',
      'test_with_many' ])
  })

})
