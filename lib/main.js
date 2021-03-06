var path = require('path')
var extend = require('node.extend.without.arrays')

module.exports = function (reporter, definition) {
  reporter.documentStore.registerComplexType('markdownToHtml', {
    tables: { type: 'Edm.Boolean' },
    // wordWrap: { type: 'Edm.Int32' },
    // linkHrefBaseUrl: { type: 'Edm.String' },
    // hideLinkHrefIfSameAsText: { type: 'Edm.Boolean' },
    // ignoreHref: { type: 'Edm.Boolean' },
    // ignoreImage: { type: 'Edm.Boolean' },
    // preserveNewlines: { type: 'Edm.Boolean' },
    // decodeOptions: { type: 'Edm.String' },
    // uppercaseHeadings: { type: 'Edm.Boolean' },
    // singleNewLineParagraphs: { type: 'Edm.Boolean' },
    // baseElement: { type: 'Edm.String' },
    // returnDomByDefault: { type: 'Edm.Boolean' },
    // longWordSplitWrapCharacters: { type: 'Edm.String' },
    // longWordSplitForceWrapOnLimit: { type: 'Edm.Boolean' }
  })

  reporter.documentStore.model.entityTypes['TemplateType'].htmlToText = { type: 'jsreport.markdownToHtml' }

  reporter.extensionsManager.recipes.push({
    name: 'markdown-to-html',
    execute: async function (request, response) {
      var globalOptions = extend(true, {}, definition.options || {})
      var localOptions = extend(true, {}, request.template.markdownToHtml || {})
      var options = extend(true, {}, globalOptions, localOptions)

      // if (!Array.isArray(options.tables)) {
      //   options.tables = (options.tables || '').split(',')
      // }
      // options.longWordSplit = options.longWordSplit || {}
      // options.longWordSplit.wrapCharacters = options.longWordSplit.wrapCharacters || (options.longWordSplitWrapCharacters || '').split(',')
      // options.longWordSplit.forceWrapOnLimit = options.longWordSplit.forceWrapOnLimit || options.forceWrapOnLimit

      const result = await reporter.executeScript({
        markdown: response.content.toString(),
        convertOptions: options
      }, {
        execModulePath: path.join(__dirname, 'scriptMarkdownToHtml.js')
      }, request)

      if (result.error) {
        const error = new Error(result.error.message)
        error.stack = result.error.stack

        throw reporter.createError('Error while processing markdown-to-html', {
          original: error,
          weak: true
        })
      }

      response.content = Buffer.from(result.htmlContent)

      response.meta.contentType = request.template.contentType || 'text/html'
      response.meta.fileExtension = request.template.fileExtension || '.html'

      const contentDisposition = request.template.contentDisposition || 'inline'

      response.meta.contentDisposition = contentDisposition + (
        contentDisposition.indexOf(';') !== -1 ? '' : ';filename=' + response.meta.reportName + '.' + response.meta.fileExtension
      )
    }
  })
}
