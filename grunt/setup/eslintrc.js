const fs = require('fs');

try {
  fs.statSync('.eslintrc');
} catch (e) {
  // Create a eslintrc by default
  fs.writeFileSync(
    '.eslintrc',
    JSON.stringify({
      env : {
        browser : true,
        node : true,
        es6 : true
      },

      ecmaFeatures : {
        arrowFunctions : true,
        binaryLiterals : true,
        blockBindings : true,
        classes : true,
        defaultParams : true,
        destructuring : true,
        forOf : true,
        generators : true,
        modules : true,
        objectLiteralComputedProperties : true,
        objectLiteralDuplicateProperties : true,
        objectLiteralShorthandMethods : true,
        objectLiteralShorthandProperties : true,
        octalLiterals : true,
        regexUFlag : true,
        regexYFlag : true,
        spread : true,
        superInFunctions : true,
        templateStrings : true,
        unicodeCodePointEscapes : true,
        globalReturn : true,
        jsx : true
      },

      rules : {
        'constructor-super': ['error'],
        'generator-star-spacing': [2, 'before'], // enforce the spacing around the * in generator functions (off by default)
        'keyword-spacing': ['error', { 'before' : true, 'after' : true }], // require a space after return, throw, and case
        'no-redeclare': ['error'],
        'no-extra-semi' : ['error'],
        'no-unused-vars' : ['error'],
        'semi' : ['error'],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'ignore'
        }],
        'space-infix-ops': ['error', { 'int32Hint' : true }], // require spaces around operators
      }
    })
  );
}
