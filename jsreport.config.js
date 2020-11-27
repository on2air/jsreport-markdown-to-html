
module.exports = {
  'name': 'markdown-to-html',
  'main': 'lib/main.js',
  'dependencies': ['templates'],
  'optionsSchema': {
    extensions: {
      'markdown-to-html': {
        type: 'object',
        properties: {
          tables: { type: 'boolean' },
          // longWordSplit: {
          //   type: 'object',
          //   properties: {
          //     wrapCharacters: { type: 'string' },
          //     forceWrapOnLimit: { type: 'boolean' }
          //   }
          // },
        }
      }
    }
  }
}
