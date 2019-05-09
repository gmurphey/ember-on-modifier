'use strict';

const VersionChecker = require('ember-cli-version-checker');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  init(...args) {
    this._super.init && this._super.init.call(this, ...args);

    const checker = new VersionChecker(this.project);
    const eventHelpersCheck = checker.for('ember-event-helpers');

    this.shouldShipHelpers = !eventHelpersCheck.exists();
  },

  treeForAddon(tree, ...args) {
    let addonTree = tree;

    if (!this.shouldShipHelpers) {
      addonTree = new Funnel(tree, {
        exclude: ['helpers']
      });
    }

    return (
      this._super.treeForAddon &&
      this._super.treeForAddon.apply(this, [addonTree, ...args])
    );
  }
};
