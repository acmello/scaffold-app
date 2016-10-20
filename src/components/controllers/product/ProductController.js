(function(global) {
  'use strict';

  function ProductCtrl ($scope, ProductService, products) {
    this.products = products;

    // private calls
    function addProductCallback (response) {
      if (response.status === 200) {

      }
    }

    // public methods
    this.addProduct = function (id) {
      ProductService.addProduct(id).then(addProductCallback.bind(this));
    }
  }

  ProductCtrl.$inject = ['$scope', 'ProductService', 'products'];

  global.ProductCtrl = ProductCtrl;

})(window);
