require('../helpers/setup');

describe('keying ' + env.ENV_DESC, function() {

  var ctx = require('./midway-base')(this),
      express = ctx.express,
      browser;
  ctx.browser.then(function(_browser) { browser = _browser; });

  var altKey = wd.SPECIAL_KEYS.Alt;
  var nullKey = wd.SPECIAL_KEYS.NULL;
  var returnKey = wd.SPECIAL_KEYS.Return;
  var enterKey = wd.SPECIAL_KEYS.Enter;

  var keyingPartial =
    '<div id="theDiv">\n' +
    '<input></input>\n' +
    '<textarea></textarea>\n' +
    '</div>\n';

  express.partials['keying nothing'] = keyingPartial;
  it('keying nothing', function() {
    return browser
      .elementByCss("#theDiv input").type("").getValue().should.become("")
      .elementByCss("#theDiv textarea").type("").getValue().should.become("");
  });

  express.partials['keying []'] = keyingPartial;
  it('keying []', function() {
    return browser
      .elementByCss("#theDiv input").type([]).getValue().should.become("")
      .elementByCss("#theDiv textarea").type([]).getValue().should.become("");
  });

  express.partials['keying \'Hello\''] = keyingPartial;
  it('keying \'Hello\'', function() {
    return browser
      .elementByCss("#theDiv input").type('Hello')
        .getValue().should.become('Hello')
      .elementByCss("#theDiv textarea").type('Hello')
        .getValue().should.become('Hello');
  });

  express.partials['keying [\'Hello\']'] = keyingPartial;
  it('keying [\'Hello\']', function() {
    return browser
      .elementByCss("#theDiv input").type(['Hello']).getValue().should.become('Hello')
      .elementByCss("#theDiv textarea").type(['Hello']).getValue().should.become('Hello');
  });

  express.partials['keying [\'Hello\',\' \',\'World\',\'!\']'] = keyingPartial;
  it('keying [\'Hello\',\' \',\'World\',\'!\']', function() {
    return browser
      .elementByCss("#theDiv input").type(['Hello', ' ', 'World', '!'])
        .getValue().should.become('Hello World!')
      .elementByCss("#theDiv textarea").type(['Hello', ' ', 'World', '!'])
        .getValue().should.become('Hello World!');
  });

  express.partials['keying \'Hello\\n\''] = keyingPartial;
  it('keying \'Hello\\n\'', function() {
    return browser
      .elementByCss("#theDiv input").type('Hello\n')
        .getValue().should.become('Hello')
      .elementByCss("#theDiv textarea").type('Hello\n')
        .getValue().should.become('Hello\n');
  });

  express.partials['keying \'\\r\''] = keyingPartial;
  it('keying \'\\r\'', function() {
    return browser
      .elementByCss("#theDiv input").type(['Hello','\r'])
        .getValue().should.become('Hello')
      .elementByCss("#theDiv textarea").type(['Hello','\r'])
        .getValue().should.become( env.DESIRED.browserName === 'firefox'?
          'Hello\n': 'Hello');
  });

  express.partials['keying [returnKey]'] = keyingPartial;
  it('keying [returnKey]', function() {
    return browser
      .elementByCss("#theDiv input").type(['Hello', returnKey])
        .getValue().should.become('Hello')
      .elementByCss("#theDiv textarea").type(['Hello', returnKey])
        .getValue().should.become('Hello\n');
  });

  express.partials['keying [enterKey]'] = keyingPartial;
  it('keying [enterKey]', function() {
    return browser
      .elementByCss("#theDiv input").type(['Hello', enterKey])
        .getValue().should.become('Hello')
      .elementByCss("#theDiv textarea").type(['Hello', enterKey])
        .getValue().should.become('Hello\n');
  });

  express.partials['keying [nullKey]'] = keyingPartial;
  it('keying [nullKey]', function() {
    return browser
      .elementByCss("#theDiv input").type(['Hello', nullKey])
        .getValue().should.become('Hello')
      .elementByCss("#theDiv textarea").type(['Hello', nullKey])
        .getValue().should.become('Hello');
  });


  if(!env.SAUCE) { // alt key seems to have no effect
    express.partials['keying [altKey]'] = keyingPartial;
    it('keying [altKey]', function() {
      return browser
        .elementByCss("#theDiv input").type([altKey, 'Hello', altKey])
          .getValue().then(function(val) {
            val.should.exist;
            val.should.not.equal('Hello');
          })
        .elementByCss("#theDiv textarea").type([altKey, 'Hello', altKey])
          .getValue().then(function(val) {
            val.should.exist;
            val.should.not.equal('Hello');
          });
    });
  }

});
