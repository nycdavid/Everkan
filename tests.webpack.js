var testsContext = require.context('./tests', true, /_test\.js$/i);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./client', true, /!(_test\.js)$/i);
srcContext.keys().forEach(srcContext);
