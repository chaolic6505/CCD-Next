module.exports = {
    plugins: ['import'],
    rules: {
        'import/newline-after-import': 'error',
        'object-curly-newline': ['error', {
            ObjectPattern: { multiline: true, minProperties: 4 },
            ImportDeclaration: { multiline: true, minProperties: 4 }
        }],
        'object-property-newline': ['error', {
            allowAllPropertiesOnSameLine: true
        }]
    }
};