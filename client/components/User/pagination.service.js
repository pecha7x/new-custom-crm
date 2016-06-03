'use strict';

(function() {

  function filteredListService() {

    return {
      paged: function (valLists, pageSize) {
        var retVal = [];
        for (var i = 0; i < valLists.length; i++) {
          if (i % pageSize === 0) {
            retVal[Math.floor(i / pageSize)] = [valLists[i]];
          } else {
            retVal[Math.floor(i / pageSize)].push(valLists[i]);
          }
        }
        return retVal;
      },

      searched: function (valLists,toSearch) {
        return _.filter(valLists,
          function (i) {
            return i.name.toLowerCase().indexOf(toSearch.toLowerCase()) == 0;
          });
      }

    };
  }

  angular.module('newCustomCrmApp.admin')
    .factory('filteredList', filteredListService);
})();
