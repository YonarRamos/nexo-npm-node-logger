"use strict";

var date = require('./date');
var context = require('./context');
var _onError;
var _onLogged;
var _withFormat;
var _errorFormat;
var INFO = 'I';
var DEBUG = 'D';
var ERROR = 'E';
function e(error) {
  var _errorFormat2, _errorFormat3, _withFormat2, _withFormat3, _onError2, _onLogged2;
  var ctxt = context.create();
  var err = (_errorFormat2 = (_errorFormat3 = _errorFormat) === null || _errorFormat3 === void 0 ? void 0 : _errorFormat3(error)) !== null && _errorFormat2 !== void 0 ? _errorFormat2 : error.message;
  var data = (_withFormat2 = (_withFormat3 = _withFormat) === null || _withFormat3 === void 0 ? void 0 : _withFormat3(ERROR, err, ctxt)) !== null && _withFormat2 !== void 0 ? _withFormat2 : defaultOf(ERROR, err);
  console.error(data);
  (_onError2 = _onError) === null || _onError2 === void 0 ? void 0 : _onError2(error, context);
  (_onLogged2 = _onLogged) === null || _onLogged2 === void 0 ? void 0 : _onLogged2(ERROR, data, context);
}
function i(msg) {
  var _withFormat4, _withFormat5, _onLogged3;
  var ctxt = context.create();
  var data = (_withFormat4 = (_withFormat5 = _withFormat) === null || _withFormat5 === void 0 ? void 0 : _withFormat5(INFO, msg, ctxt)) !== null && _withFormat4 !== void 0 ? _withFormat4 : defaultOf(INFO, msg);
  console.info(data);
  (_onLogged3 = _onLogged) === null || _onLogged3 === void 0 ? void 0 : _onLogged3(INFO, data, context);
}
function d(msg) {
  var _withFormat6, _withFormat7, _onLogged4;
  var ctxt = context.create();
  var data = (_withFormat6 = (_withFormat7 = _withFormat) === null || _withFormat7 === void 0 ? void 0 : _withFormat7(DEBUG, msg, ctxt)) !== null && _withFormat6 !== void 0 ? _withFormat6 : defaultOf(DEBUG, msg);
  console.debug(data);
  (_onLogged4 = _onLogged) === null || _onLogged4 === void 0 ? void 0 : _onLogged4(DEBUG, data, context);
}
function withFormat(callback) {
  _withFormat = callback;
}
function errorFormat(callback) {
  _errorFormat = callback;
}
function onLogged(callback) {
  _onLogged = callback;
}
function onError(callback) {
  _onError = callback;
}
function defaultOf(type, msg) {
  var color = "";
  switch (type) {
    case ERROR:
      color = "\x1b[31m" + "ERROR" + "\x1b[0m";
      break;
    case INFO:
      color = "\x1b[33m" + "INFO" + "\x1b[0m";
      break;
    case DEBUG:
      color = "\x1b[35m" + "DEBUG" + "\x1b[0m";
      break;
  }
  return "".concat(date.getDate(), " ").concat(color, " ").concat(context.subStack(), " - ").concat(msg);
}
module.exports = {
  withFormat: withFormat,
  errorFormat: errorFormat,
  onLogged: onLogged,
  onError: onError,
  i: i,
  e: e,
  d: d,
  types: {
    INFO: INFO,
    DEBUG: DEBUG,
    ERROR: ERROR
  }
};