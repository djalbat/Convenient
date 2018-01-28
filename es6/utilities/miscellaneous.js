'use strict';

const GET_METHOD = 'GET',
      POST_METHOD = 'POST',
      ETX_CHARACTER = '\u0003';

function get(host, uri, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///
    parameters = {};
  }

  const method = GET_METHOD,
        body = undefined;

  request(host, uri, parameters, method, body, callback);
}

function post(host, uri, json, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///
    parameters = {};
  }

  const method = POST_METHOD,
        body = JSON.stringify(json);

  request(host, uri, parameters, method, body, callback);
}

function onETX(handler) {
  const { stdin } = process,
        { setRawMode } = stdin;

  if (setRawMode) {
    const rawMode = true,
          encoding = 'utf8';

    stdin.setRawMode(rawMode);
    stdin.setEncoding(encoding);

    stdin.resume();

    stdin.addListener('data', dataHandler);

    return offExt;
  }

  function offExt() {
    stdin.removeListener('data', dataHandler);
  }

  function dataHandler(character) {
    if (character === ETX_CHARACTER) {
      handler();
    }
  }
}

module.exports = {
  get: get,
  post: post,
  onETX: onETX
};

function request(host, uri, parameters, method, body, callback) {
  const url = urlFromHostURIAndParameters(host, uri, parameters),
        xmlHttpRequest = new XMLHttpRequest();

  xmlHttpRequest.onreadystatechange = function() {
    const { readyState, status, responseText } = xmlHttpRequest;

    if (readyState == 4) {
      if (status == 200) {
        const jsonString = responseText, ///
              json = JSON.parse(jsonString);

        callback(json);
      } else {
        callback(null);
      }
    }
  };

  xmlHttpRequest.open(method, url, true);

  xmlHttpRequest.send(body);
}

function urlFromHostURIAndParameters(host, uri, parameters) {
  const queryString = queryStringFromParameters(parameters),
        url = (queryString === '') ?
                `${host}/${uri}` :
                  `${host}/${uri}?${queryString}`;

  return url;
}

function queryStringFromParameters(parameters) {
  const names = Object.keys(parameters),
        namesLength = names.length,
        lastIndex = namesLength - 1,
        queryString = names.reduce(function(queryString, name, index) {
          const value = parameters[name],
                encodedName = encodeURIComponent(name),
                encodedValue = encodeURIComponent(value),
                ampersandOrNothing = (index !== lastIndex) ? '&' : '';

          queryString += `${encodedName}=${encodedValue}${ampersandOrNothing}`;

          return queryString;
        }, '');

  return queryString;
}