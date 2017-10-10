/**
 * Created by Alvin on 2/16/2017.
 */
(function(){
   var app= angular.module('hive',['ui.router']);
   app.config(
        function($stateProvider,$urlRouterProvider){
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('signin', {
                    url:'/',
                    templateUrl : "home/signin.html",
                    controller : "homecontroller"
                }).state('register', {
                     url:'/register',
                     templateUrl : "home/register.html",
                     controller : "homecontroller"
            });
        }
    );
   app.controller('homecontroller',['$http','$scope','$state',function ($http,$scope,$state) {
       $scope.newuser=function(){
       $scope.error=false;
       $scope.success=false;
       $http.post('api/user/register',$scope.register).then(function successCallback(response){
           console.log(response.data.error);
           if(response.data.error) {
               $scope.error = true;
               $scope.message=response.data.details;
           }
           else
           {
               $scope.success = true;
               $scope.message=response.data.details;
           }
           },
       function errorCallback (response) {
           console.log("bad day");
       }
       );
   }
   $scope.loguserin=function(){
       $scope.error=false;
       $scope.success=false;
       $http.post('api/user/login',$scope.login).then(function successCallback(response){
               console.log(response.data.error);
               if(response.data.error) {
                   $scope.error = true;
                   $scope.message=response.data.details;
               }
               else
               {
                   $scope.success = true;
                   $scope.message=response.data.details;
                   window.location='/';
               }
           },
           function errorCallback (response) {
               console.log("bad day");
           }
       );
   };
   }]);
}())