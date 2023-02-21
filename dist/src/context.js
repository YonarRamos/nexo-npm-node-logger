"use strict";

function subStack() {
  var stack = new Error().stack;
  if (stack) {
    var parenthesis = stack.indexOf("at ");
    var substring;
    stack = stack.substring(parenthesis + 1);
    while (parenthesis !== -1) {
      parenthesis = stack.indexOf("at ");
      substring = stack.substring(0, parenthesis + 1);
      if (substring.indexOf("node_modules") !== -1) {
        stack = stack.substring(parenthesis + 1);
      } else {
        substring = substring.substring(0, substring.indexOf('\n'));
        break;
      }
    }
    var bar = -1;
    for (var i = 0; i < substring.length; i++) {
      if (substring.indexOf('\\', i) !== -1) bar = substring.indexOf('\\', i);
    }
    return substring.substring(bar + 1);
  }
  return stack;
}
function getFileName() {
  var substack = subStack();
  var twoPoints = substack.indexOf(':');
  var fileName = substack.substring(0, twoPoints);
  return fileName;
}
function getLine() {
  var substack = subStack();
  var twoPoints = substack.indexOf(':');
  var lineColumn = substack.substring(twoPoints + 1);
  twoPoints = lineColumn.indexOf(':');
  var line = lineColumn.substring(0, twoPoints);
  return line;
}
function getColumn() {
  var substack = subStack();
  var twoPoints = substack.indexOf(':');
  var lineColumn = substack.substring(twoPoints + 1);
  twoPoints = lineColumn.indexOf(':');
  var column = lineColumn.substring(twoPoints + 1);
  return column;
}
function getTimestamp() {
  return new Date();
}
function getContext() {
  var context = {
    filename: getFileName(),
    line: getLine(),
    column: getColumn(),
    timestamp: getTimestamp()
  };
  return context;
}
module.exports = {
  subStack: subStack,
  create: getContext
};