(function(global) {
  'use strict';

  function ProductService (RESTService) {
    this.path = 'https://shoppingcart-mcfadyenbrazil.rhcloud.com/api';
    this.products = null;

    this.getProducts = function () {
      if (this.products) {
        return this.products;
      }

      return RESTService.get(this.path.concat('/products'));
    }

    this.getProductDetail = function (id) {
      return this.products.filter(function (product) {
        return product.id === id;
      });
    }

    this.addProduct = function (obj) {
      return RESTService.post(
        this.path.concat('/shoppingcart/items'), obj);
    }
  }

  ProductService.$inject = ['RESTService'];

  global.ProductService = ProductService;

})(window);
