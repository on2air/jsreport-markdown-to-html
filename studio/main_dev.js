import Properties from './Properties.js'
import Studio from 'jsreport-studio'

Studio.addPropertiesComponent('markdown-to-html', Properties, (entity) => entity.__entitySet === 'templates' && entity.recipe === 'markdown-to-html')

Studio.addApiSpec({
  template: {
    markdownToHtml: {
      tables: true
    }
  }
})
