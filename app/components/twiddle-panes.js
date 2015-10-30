import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  resizeableColumns: inject.service('resizeable-columns'),
  classNames: ['twiddle-panes'],

  init() {
    this._super(...arguments);
    this.get('resizeableColumns'); // ensure service created
  },

  didRender() {
    this.$('.handle').remove();
    if (!this.get('media.isMobile')) {
      this.$('.pane').after('<div class="handle"></div>');
      this.$('.handle').last().remove();
      this.$('.handle').drags({pane: ".pane"});
    }
  }
});
