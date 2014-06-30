'use strict';

jiraKanbanCards.provider('Jira', ['cons', '$base64'], function (cons, $base64) {

    this.url = '/';
    this.username = '';
    this.password = '';
    this.fields = 'all*';

    this.$get = function () {
        var url = this.url;
        var password = this.password;
        var username = this.username;
        var self = this;

        return {
            invoke: function () {

            },

            getIssuesByJql: function (jql, fields) {
                var path = 'search?fields=' + fields + '&maxResults=100&jql=' + encodeURIComponent(jql).replace(/%252F/g, '/');
                self.query(cons.GET, path)
            },

            getVersionsByProject: function (projectKey) {
                query(cons.GET, "project/" + projectKey + "/versions?");
            },

            updateTicket: function (ticketKey, newData, transition) {
                var method = cons.PUT;
                var transitionUrl = "";
                if (angular.isBoolean(transition) && transition === true) {
                    transitionUrl = '/transitions?expand=transitions.fields';
                    method = cons.POST;
                }
                query(method, 'issue/' + ticketKey + transitionUrl, newData);
            }

        };
    };

    /**
     * set the username and password for the current request
     * this could change later to a token authentification
     * @param username
     * @param password
     */
    this.$auth = function (username, password) {
        this.username = username;
        this.password = password;
    };

    /**
     * get base information about a ticket
     * function still contains some warnings - should be fixed
     * @param ticket
     * @return ticket
     */
    this.$getBaseInformationForIssue = function (ticket) {

        return ticket;
    };

    this.setUrl = function (url) {
        this.url = url;
    };

    this.setUrlArray = function (urlArray) {
        this.urlArray = urlArray;
    };

    this.query = function (method, query, data) {
        var result = this.sendRequest(method, query, data);
        if (result === false) {
            $window.alert("It wasn't possible to get jira url " + this.url + query + 'with username ' + this.username);
        }
        return result;
    };

    this.sendRequest = function (method, query, data) {
        /**
         * start to build the header
         */
        var headers = {'Content-Type:': 'application/json'};

        /**
         * add authorization
         */
        if (angular.isString(this.username)) {
            var credential = $base64.encode(this.username + ':' + this.password);
            headers['Authorization'] = 'Basic ' + credential;
        }

        return data;
//        $http.get(this.url)
//            .success(function (data, status, headers, config) {
//                $rootScope.login = data;
//                if (data === '') {
//                    $rootScope.$broadcast('event:auth-loginRequired');
//                } else {
//                    $rootScope.$broadcast('event:auth-authConfirmed');
//                }
//            });
    };

});