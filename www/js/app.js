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
    url: '/others',
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
app.controller('mainController', function($scope, $state, $stateParams, $ionicHistory, $ionicViewSwitcher, $ionicModal, $window) {


  /* Handle the modal screen */
  $ionicModal.fromTemplateUrl('templates/modal-answer.html', {
    
    scope: $scope,
    animation: 'slide-in-up',
    backdropClickToClose: false,    // Prevent the modal hiding (see http://stackoverflow.com/questions/31218684/how-to-prevent-ionic-modal-from-hidding)
    hardwareBackButtonClose: false  // Prevent the modal hiding (see http://stackoverflow.com/questions/31218684/how-to-prevent-ionic-modal-from-hidding)
  
  }).then(function(modal) {
  
    $scope.modal = modal;
  
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });

  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  /* Handle the modal screen */

  
  $scope.meatList = $scope.drinkList = $scope.otherList = "Nenhuma escolha";
  //$scope.manQuantity = $scope.womanQuantity = $scope.childQuantity = 0; 
  $scope.manQuantity   = $window.localStorage['man'];
  $scope.womanQuantity = $window.localStorage['woman'];
  $scope.childQuantity = $window.localStorage['child'];

  /* I'm doing this hardcoded now. Improve this! */
  /* I was with a lot of dificulties in handle checkboxes */
  /* I find a nice example here: http://codepen.io/DeutschMark/pen/oXNBYQ */
  /* I'm following this example and it works fine! */
  $scope.meats = [{
        name: "Contra File",
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
        name: "Linguica",
        id: 8
    }, {
        name: "Coracao",
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
        name: "Cachaca",
        id: 3
    }, {
        name: "Suco",
        id: 4
    }, {
        name: "Agua",
        id: 5
    }, ];



    $scope.others = [{
        name: "Pao",
        id: 1
    }, {
        name: "Arroz",
        id: 2
    }, {
        name: "Salada",
        id: 3
    }, {
        name: "Maionese",
        id: 4
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


  $scope.saveQuantity = function (quantity, who) {

    if (quantity == "") { /* think what to do if the user erase the field. I think that is better fill with "0"*/ }

    $window.localStorage.setItem(who, quantity);

  }



  var quantityChoosed = function (type) {
    for (item in $window.localStorage) {

    };
    return 0;
  }

  

  /* ------------- */
  /* Main function */
  /* ------------- */
  $scope.calcBarbecue = function () {

    /* This way to define the variables improve the code readability */
    /* Get the itens choosed */
    var meatsChoosed  = $scope.meatList.split(",");
    var drinksChoosed = $scope.drinkList.split(",");
    var othersChoosed = $scope.otherList.split(",");

    /* Variables to store the result */
    var drinksNeededObj = {}; // I'm testing the 2 ways 
    var meatsNeededObj  = {};
    var othersNeededObj = {};

    /* Double verification */
    $scope.manQuantity   = $window.localStorage['man'];
    $scope.womanQuantity = $window.localStorage['woman'];
    $scope.childQuantity = $window.localStorage['child'];

    /* Calculate the quantity needed - see table of quantity (hardcoded yet) */
    var meatQuantityNeeded  = ($scope.manQuantity * 450)   + ($scope.womanQuantity * 400)   + ($scope.childQuantity * 200);
    var drinkQuantityNeeded = ($scope.manQuantity * 1500)  + ($scope.womanQuantity * 1000)  + ($scope.childQuantity * 500);
    var otherQuantityNeeded = parseInt($scope.manQuantity) + parseInt($scope.womanQuantity) + parseInt($scope.childQuantity);
    

    /* Validate if the users put a number in the quantity field */
    var reg = new RegExp(/^\d+$/);

    if ( !reg.test($scope.manQuantity)  || !reg.test($scope.womanQuantity) || !reg.test($scope.childQuantity)) {
        alert("só vale números, vivente!");
        return;
    }

    /* Split the total quantity to the itens choosed */
    for (item in drinksChoosed) {
      if (drinksChoosed[item].trim().toUpperCase() == "NENHUMA ESCOLHA") {
        drinksNeededObj[drinksChoosed[item].trim()] = ".";
        break;
      }
      drinksNeededObj[drinksChoosed[item].trim()] = drinkQuantityNeeded / drinksChoosed.length;
    }

    // Here, I'm working directly with the localStorage. Change this to work with $scope variables.
    if ($window.localStorage['man'] > 0 && $window.localStorage['1d'] == 'true') { 
      drinksNeededObj['Cerveja'] = parseInt($window.localStorage['man']) * 1500; /* The beer always follow the man quantity */
    }

    for (item in meatsChoosed) {
      if (meatsChoosed[item].trim().toUpperCase() == "NENHUMA ESCOLHA") {
        meatsNeededObj[meatsChoosed[item].trim()] = ".";
        break;
      }
      meatsNeededObj[meatsChoosed[item].trim()] = meatQuantityNeeded / meatsChoosed.length;
    }

    for (item in othersChoosed) {
      if (othersChoosed[item].trim().toUpperCase() == "NENHUMA ESCOLHA") {
        othersNeededObj[othersChoosed[item].trim()] = ".";
        break;
      }
      othersNeededObj[othersChoosed[item].trim()] = otherQuantityNeeded / othersChoosed.length;
    }

    $scope.drinkResult = drinksNeededObj;
    $scope.meatResult  = meatsNeededObj;
    $scope.otherResult = othersNeededObj;

    $scope.modal.show();
  };
  /* ----------------- */
  /* End Main function */
  /* ----------------- */


  /* ---------------------- */
  /* Clean the localStorage */
  /* ---------------------- */
  $scope.newCalc = function () {
    $window.localStorage.clear();
    $window.location.reload();
  }


  /* ------------------------------------- */
  /* Save the barbecue in the localStorage */
  /* ------------------------------------- */
  $scope.saveBarbecue = function () {
    //alert("Ok!");
    // DEPRECATED
  }


  
  /* Show the options that the user have choiced in the main screen */
  for (item in $window.localStorage) {  
    if( item.indexOf("m") != -1 && $window.localStorage[item] == 'true' ) { 
      $scope.meatList = $scope.meatList.replace("Nenhuma escolha", ""); /* Erase the "None". It's hardcoded now, change this! */
      $scope.meatList += ", " + $scope.meats[item[0]].name;
    }

    if( item.indexOf("d") != -1 && $window.localStorage[item] == 'true' ) { 
      $scope.drinkList = $scope.drinkList.replace("Nenhuma escolha", ""); /* Erase the "None". It's hardcoded now, change this! */
      $scope.drinkList += ", " + $scope.drinks[item[0]].name;
    }

    if( item.indexOf("o") != -1 && $window.localStorage[item] == 'true') { 
      $scope.otherList = $scope.otherList.replace("Nenhuma escolha", ""); /* Erase the "None". It's hardcoded now, change this! */
      $scope.otherList += ", " + $scope.others[item[0]].name;
    }
  }
  $scope.meatList  = $scope.meatList.replace(", ", "");
  $scope.drinkList = $scope.drinkList.replace(", ", "");
  $scope.otherList = $scope.otherList.replace(", ", "");


  $scope.doIfChecked = function (checkValue, checkName) {
    
    $window.localStorage[checkName] = checkValue; // Save the meats in localValue. I think that this is not the right way to do that, but it works now.
  };


  $scope.changePage = function(page) {
    $ionicViewSwitcher.nextDirection('forward'); // Animation
    $state.go(page);
  };  


  $scope.goBack = function () {
    //$ionicHistory.goBack(); // This doesn't work for me! Fix this!
    window.history.back();
  };

});