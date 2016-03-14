angular.module('App')
.config(function($stateProvider) {
  $stateProvider.state('places', {
    url: '/places',
    controller: 'PlacesController as vm',
    templateUrl: 'views/places/places.html'
  });
})
.controller('PlacesController', function($http, $scope, Geolocation) {
  var vm = this;
  var base = 'https://civinfo-apis.herokuapp.com/civic/places?type=park&location=' + Geolocation.geometry.location.lat + ',' + Geolocation.geometry.location.lng;
  var token = '';
  vm.canLoad = true;
  vm.places = [];

  vm.load = function load() {
    var url = base;
    if (token) {
      url += '&token=' + token;
    }

    $http.get(url).then(function handleResponse(response) {
      vm.places = vm.places.concat(response.data.results);
      token = response.data.next_page_token;

      if (!response.data.next_page_token) {
        vm.canLoad = false;
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
});
