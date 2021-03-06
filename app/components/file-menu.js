import Ember from "ember";

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['dropdown'],

  belongsToUser: computed('model.ownerLogin', 'session.currentUser.login', function() {
    return this.get('model.ownerLogin') === this.get('session.currentUser.login');
  }),

  actions: {
    addComponent() {
      this.attrs.addComponent();
    },
    addHelper() {
      this.attrs.addHelper();
    },
    addFile(type) {
      this.attrs.addFile(type);
    },
    renameFile(file) {
      this.attrs.renameFile(file);
    },
    removeFile(file) {
      this.attrs.removeFile(file);
    },
    saveGist(model) {
      this.sendAction('saveGist', model);
    },
    share() {
      prompt('Ctrl + C ;-)', window.location.href);
    },
    embed() {
      let src = window.location.href.split('?')[0];
      src += '?fullScreen=true';
      let responsive = document.createElement('div');
      responsive.style.cssText = 'position:relative;height:0;overflow:hidden;max-width:100%;padding-bottom:56.25%;'; // 16:9
      let iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
      responsive.appendChild(iframe);
      let embedCode = responsive.outerHTML;
      prompt('Ctrl + C ;-)', embedCode);
    },
    fork(model) {
      this.sendAction('fork', model);
    },
    copy() {
      this.sendAction('copy');
    },
    deleteGist(model) {
      this.attrs.deleteGist(model);
    },
    signInViaGithub() {
      this.sendAction('signInViaGithub');
    }
  }
});
