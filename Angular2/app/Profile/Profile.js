'use strict';

angular
  .module('myApp')
  .controller('ProfileCtrl', function() {
    this.person = {};
    this.saved = {};

    const vm = this;
    this.formSubmit = function() {
      console.log('clicked');

      vm.saved = vm.person;
      vm.person = {};
      vm.$setPristine();
    };
  });