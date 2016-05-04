// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('meats', {
    url: '/meats',
    templateUrl: 'templates/meats.html'
  })

  .state('drinks', {
    url: '/drinks',
    templateUrl: 'templates/drinks.html'
  })

  .state('others', {
    url: '/meats',
    templateUrl: 'templates/others.html'
  })


  /* Default template Ionic*/
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});


/* Main Controller to the Home Page*/
app.controller('mainController', function($scope, $state, $stateParams, $ionicHistory, $ionicViewSwitcher, $window) {

  /* I'm doing this hardcoded now. Improve this! */
  /* I was with a lot of dificulties in handle checkboxes */
  /* I find a nice example here: http://codepen.io/DeutschMark/pen/oXNBYQ */
  /* I'm following this example and it works fine! */
  $scope.meats = [{
        name: "Contra Filé",
        id: 1
    }, {
        name: "Coxa de Frango",
        id: 2
    }, {
        name: "Asa de Frango",
        id: 3
    }, {
        name: "Alcatra",
        id: 4
    }, {
        name: "Maminha",
        id: 5
    }, {
        name: "Costela",
        id: 6
    }, {
        name: "Cupim",
        id: 7
    }, {
        name: "Linguiça",
        id: 8
    }, {
        name: "Coração",
        id: 9
    }, ];


  /* I messed the ids to see if the checkbox will continue work well */
  /* Seems like the id field doesn't make difference in this case */
  /* I'm considering use another field more significantly here */
  $scope.drinks = [{
        name: "Refrigerante",
        id: 1
    }, {
        name: "Cerveja",
        id: 2
    }, {
        name: "Cachaça",
        id: 3
    }, {
        name: "Suco",
        id: 4
    }, {
        name: "Água",
        id: 5
    }, ];



    $scope.others = [{
        name: "Other 1",
        id: 1
    }, {
        name: "Other 2",
        id: 2
    }, {
        name: "Other 3",
        id: 3
    }, {
        name: "Other 4",
        id: 4
    }, {
        name: "Other 5",
        id: 5
    }, ];




  $scope.updateDrinksLocalStorage = function($index) {

    $window.localStorage.setItem($index + "d", $scope.drinks[$index].checked);
  };

  $scope.updateMeatsLocalStorage = function($index) {

    $window.localStorage.setItem($index + "m", $scope.meats[$index].checked);
  };

  $scope.updateOthersLocalStorage = function($index) {

    $window.localStorage.setItem($index + "o", $scope.others[$index].checked);
  };


  $scope.getCheckDrinks = function(item) {
    // get the stored toggle (true or false) and
    // pass it over to the ng-checked in the html
    return $window.localStorage[item+"d"];
  };

  $scope.getCheckMeats = function(item) {
    // get the stored toggle (true or false) and
    // pass it over to the ng-checked in the html
    return $window.localStorage[item+"m"];
  };

  $scope.getCheckOthers = function(item) {
    // get the stored toggle (true or false) and
    // pass it over to the ng-checked in the html
    return $window.localStorage[item+"o"];
  };


  
  for (item in $window.localStorage) {

      //if ($window.localStorage[item] == 'true') { $scope.meatList  += " " + $scope.meats[item].name; }
      //if ($window.localStorage[item] == 'true') { $scope.drinkList += " " + $scope.drinks[item].name; }
      //if ($window.localStorage[item] == 'true') { $scope.otherList += " " + $scope.others[item].name; }
  }

  $scope.doIfChecked = function (checkValue, checkName) {
    
    $window.localStorage[checkName] = checkValue; // Save the meats in localValue. I think that this is not the right way to do that, but it works now.
  };

  $scope.changePageMeats = function() {
    $ionicViewSwitcher.nextDirection('forward'); // Animation
    $state.go('meats');
  };  

  $scope.changePageDrinks = function() {
    $ionicViewSwitcher.nextDirection('forward'); // Animation
    $state.go('drinks');
  };  

  $scope.changePageOthers = function() {
    $ionicViewSwitcher.nextDirection('forward'); // Animation
    $state.go('others');
  };  



  $scope.goBack = function () {
    //$ionicHistory.goBack(); // This doesn't work for me! Fix this!
    window.history.back();

  };

});