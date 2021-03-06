import Ember from 'ember';

const { computed } = Ember;
const MAX_COLUMNS = 3;

export default Ember.Component.extend({
  focusEditor: 'focusEditor',
  selectFile: 'selectFile',
  keyMap: 'basic',

  editorMode: Ember.computed('file.extension', function () {
    switch(this.get('file.extension')) {
      case '.js':
        return 'javascript';
      case '.hbs':
        return 'handlebars';
      case '.css':
        return 'css';
      default:
        return 'html';
    }
  }),

  isLastColumn: computed('col', 'numColumns', function() {
    let numColumns = this.get('numColumns');
    return (this.get('col') | 0) === numColumns && numColumns < MAX_COLUMNS;
  }),

  isFirstColumn: computed.equal('col', '1'),

  showFileTreeOpenIcon: computed('isFirstColumn', 'fileTreeShown', function() {
    return this.get('isFirstColumn') && !this.get('fileTreeShown');
  }),

  focusIn () {
    this.sendAction('focusEditor', this);
  },

  actions: {
    selectFile (file) {
      this.set('file', file);
      this.sendAction('selectFile', file);
    },

    valueUpdated() {
      this.sendAction('contentsChanged');
    },

    removeColumn(col) {
      this.attrs.removeColumn(col);
    },

    addColumn() {
      this.attrs.addColumn();
    },

    showFileTree() {
      this.attrs.showFileTree();
    }
  }
});
