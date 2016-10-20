(function (global) {
  'use strict';

  function ProductDetailCtrl ($scope, ProductService, $stateParams) {
    this.product = ProductService.getProductDetail($stateParams.id)[0];
    this.quantity = 0;

    this.addProduct = function () {
      var product = {
        product_id: this.product.id,
        quantity: this.quantity
      };

      if (product.quantity > 0) {
        ProductService.addProduct(product).then(
          function (response) {
            console.log(response);
          }
        )
      }
    }

    this.increaseProductQty = function () {
      this.quantity = this.quantity + 1;
    }

    this.decreaseProductQty = function () {
      if (this.quantity > 0) {
        this.quantity = this.quantity - 1;
      }
    }
  }

  ProductDetailCtrl.$inject = ['$scope', 'ProductService', '$stateParams'];

  global.ProductDetailCtrl = ProductDetailCtrl;

})(window);
