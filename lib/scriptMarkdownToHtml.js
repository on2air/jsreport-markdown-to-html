var showdown = require('showdown')

module.exports = async (inputs, callback, done) => {
  try {
    const converter = new showdown.Converter(inputs.convertOptions)
    const htmlContent = converter.makeHtml(inputs.markdown)

    done(null, {
      htmlContent
    })
  } catch (e) {
    done(null, {
      error: {
        message: e.message,
        stack: e.stack
      }
    })
  }
}
