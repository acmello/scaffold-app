'use strict';

(function() {
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'partials/products.html',
        controller: 'ProductCtrl',
        controllerAs: 'productCtrl',
        resolve: {
          'products': ['ProductService', function (ProductService) {
            return ProductService.getProducts().then(function (response) {
              var data = response.data;
              ProductService.products = data;
              console.log(data);
              return data;
            })
          }]
        }
      })
      .state('detail', {
        url: '/product/:id',
        templateUrl: 'partials/product-detail.html',
        controller: 'ProductDetailCtrl',
        controllerAs: 'productDetailCtrl'
      })

      $urlRouterProvider.otherwise('/products');
  }

  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

  angular.module('myApp', ['ui.router'])
    .config(config)
    .service('ProductService', ProductService)
    .service('RESTService', RESTService)
    .controller('ProductCtrl', ProductCtrl)
    .controller('ProductDetailCtrl', ProductDetailCtrl)

})();

