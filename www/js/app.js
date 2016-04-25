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
    url: '/meats',
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

  //$scope.womanQuantity = 10;

  $scope.checkCostela = true;  // É ASSIM QUE FAZ PRA SETAR ESSE CHECKBOX!!!!!!!!!!!!!!!!!!!!
  console.log($scope);


  for (item in $window.localStorage) {
    $scope.meatList += " " + item;
  }

  
  var getCheckBoxCode = function (checkBoxName) {

    //alert("entrei com " + checkBoxName);

    var checkBoxNames = ["Contra-filé", "Coxa de Frango", "Asa de Frango", "Alcatra", "Maminha", "Costela", "Cupim", "Linguiça", "Coração"];
    var checkBoxCodes = ["contraFile", "coxaFrango", "asaFrango", "alcatra", "maminha", "costela", "cupim", "linguica", "coracao"];

    //alert(checkBoxNames.indexOf("Maminha"));


    return checkBoxCodes[ checkBoxNames.indexOf(checkBoxName.trim()) ];

  };

  $scope.trueOrFalse = function (checkBox) {

    //alert("entrei no true or false com " + checkBox);
    
    
    for (item in $window.localStorage) {

      //alert(item + " " + check);

      if(item == checkBox) { 
          var check = getCheckBoxCode(checkBox);
          
          //alert("vou retornar " + $window.localStorage[item]);
          

          ret = "filter." + check + "=" + $window.localStorage[item];



          //alert("vou retornar " + ret);
          return ret;
        }
    }
    return false; // If doesn't find
  }


  $scope.doIfChecked = function (checkValue, checkName) {
    
    $window.localStorage[checkName] = checkValue; // Save the meats in localValue. I think that this is not the right way to do that, but it works now.

    //console.log($window.localStorage)
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