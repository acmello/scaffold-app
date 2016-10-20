(function (global){
  'use strict';

  function RESTService ($http) {
    this.get = function (url) {
      return $http({
        method: 'GET',
        url: url
      });
    }

    this.post = function (url, data) {
      return $http({
        method: 'POST',
        url: url,
        data: data
      });
    }
  }

  RESTService.$inject = ['$http'];

  global.RESTService = RESTService;

})(window);
