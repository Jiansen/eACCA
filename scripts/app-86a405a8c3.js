"use strict";angular.module("site",["ui.router","ui.bootstrap"]).config(["$stateProvider","$urlRouterProvider",function(e,n){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}).state("demo",{url:"/demo",templateUrl:"app/demo/demo.html",controller:"DemoCtrl"}),n.otherwise("/")}]),angular.module("site").controller("DemoCtrl",["$scope","$filter",function(e,n){e.startDate="",e.endDate="",e.format="EEE dd-MMM-yyyy",e.open=function(n,t){n.preventDefault(),n.stopPropagation(),"start"===t?e.stateOpened=!0:e.endOpened=!0},e.validDates=!1,e.checkDates=function(){if(e.startDate<=e.endDate){e.validDates=!0;for(var t=e.startDate.getTime()-e.startDate.getMilliseconds(),o=864e5,c=e.endDate.getTime()-e.endDate.getMilliseconds();c>=t;t+=o)e.dayRecords.push(new a(n("date")(new Date(t),"EEE dd-MMM-yyyy")))}};var t=function(){return{date:"",name:"",price:0,checked:!0}},o=function(e){var n={name:e,incomeItems:[new t],expenseItems:[new t],addIncomeItem:function(){this.incomeItems.push(new t)},addExpenseItem:function(){this.expenseItems.push(new t)},totalIncome:function(){var e,n=0;for(e in this.incomeItems){var t=this.incomeItems[e];t.checked&&(n+=Number(t.price))}return n},totalExpense:function(){var e,n=0;for(e in this.expenseItems){var t=this.expenseItems[e];t.checked&&(n+=Number(t.price))}return n},totalBalance:function(){return this.totalIncome()-this.totalExpense()}};return n},a=function(e){return{name:e,groups:[new o("Eat-in Cash"),new o("Delivery Cash"),new o("Just Eat Cash"),new o("Eat-in Card"),new o("Delivery Card"),new o("Just Eat Card"),new o("Eat-in Cheque"),new o("Delivery Cheque"),new o("Other")]}};e.dayRecords=[]}]).filter("groupTotalIncome",function(){return function(e){return e.totalIncome()}}).filter("dayTotalIncome",function(){return function(e){var n,t=0;for(n in e.groups){var o=e.groups[n];t+=o.totalIncome()}return t}}).filter("groupTotalExpense",function(){return function(e){return e.totalExpense()}}).filter("dayTotalExpense",function(){return function(e){var n,t=0;for(n in e.groups){var o=e.groups[n];t+=o.totalExpense()}return t}}).filter("groupTotalBalance",function(){return function(e){return e.totalBalance()}}).filter("dayTotalBalance",function(){return function(e){var n,t=0;for(n in e.groups){var o=e.groups[n];t+=o.totalBalance()}return t}}),angular.module("site").controller("MainCtrl",["$scope",function(e){e.awesomeThings=[]}]),angular.module("site").run(["$templateCache",function(e){e.put("app/demo/demo.html",'<div class="container"><div class="row" ng-show="!validDates"><div class="col-md-6">Start Date</div><div class="col-md-6">End Date</div><div class="col-md-6"><p class="input-group"><input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="startDate" is-open="stateOpened" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event, \'start\')"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div><div class="col-md-6"><p class="input-group"><input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="endDate" is-open="endOpened" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event, \'end\')"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div><button type="button" class="btn btn-primary" ng-click="checkDates()">Confirm Start and End Dates</button></div><div ng-show="validDates"><accordion close-others="false"><accordion-group is-open="dayStatus.open" ng-repeat="dayRecord in dayRecords"><accordion-heading><div class="row"><span class="col-md-2">{{ dayRecord.name }}</span> <span class="col-md-3">Income: {{ dayRecord | dayTotalIncome }}</span> <span class="col-md-3">Expense: {{ dayRecord | dayTotalExpense }}</span> <span class="col-md-3">Balance: {{ dayRecord | dayTotalBalance }}</span> <i class="col-md-1 pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': dayStatus.open, \'glyphicon-chevron-right\': !dayStatus.open}"></i></div></accordion-heading><div class="col-md-12 row"><div class="col-md-12"><accordion close-others="false"><accordion-group is-open="groupStatus.open" ng-repeat="group in dayRecord.groups"><accordion-heading><div class="row"><span class="col-md-2">{{ group.name }}</span> <span class="col-md-3">Income: {{ group | groupTotalIncome }}</span> <span class="col-md-3">Expense: {{ group | groupTotalExpense }}</span> <span class="col-md-3">Balance: {{ group | groupTotalBalance }}</span> <i class="col-md-1 pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': groupStatus.open, \'glyphicon-chevron-right\': !groupStatus.open}"></i></div></accordion-heading><div class="col-md-12 row"><div class="col-md-2"></div><div class="col-md-4 row"><div class="col-md-12 row" ng-repeat="item in group.incomeItems"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-model="item.checked"></span><input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div></div><div class="col-md-12 glyphicon glyphicon-plus" ng-click="group.addIncomeItem()"></div></div><div class="col-md-4 row"><div class="col-md-12 row" ng-repeat="item in group.expenseItems"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-model="item.checked"></span><input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div><div class="col-md-12 glyphicon glyphicon-plus" ng-click="group.addExpenseItem()"></div></div></div><div class="col-md-3 row"></div></div></accordion-group></accordion></div></div></accordion-group></accordion></div></div>'),e.put("app/main/main.html",'<div class="container"><a ui-sref="demo">Demo</a></div>')}]);