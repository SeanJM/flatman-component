const fs = require('fs');

try {
  fs.statSync('.jshintrc');
} catch (e) {
  // Create a jshintrc by default
  fs.writeFileSync(
    '.jshintrc',
    JSON.stringify({
      laxcomma : true,
      laxbreak : true,
      esnext : true
    })
  );
}
