'use strict';

jiraKanbanCards.provider('Jira', ['cons', '$base64', '$window'], function (cons, $base64, $window) {

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
            invoke: function (jiraUrl) {
                url = jiraUrl;
            },

            getIssuesByJql: function (jql, callback, fields) {
                var path = '';
                if(fields) {
                    path = 'search?fields=' + fields + '&maxResults=100&jql=' + encodeURIComponent(jql).replace(/%252F/g, '/');
                }else {
                    path = jql;
                }
                self.sendRequest(cons.GET, path, callback)
            },

            getVersionsByProject: function (projectKey, callback) {
                self.sendRequest(cons.GET, "project/" + projectKey + "/versions?", callback);
            },

            updateTicket: function (ticketKey, newData, transition) {
                var method = cons.PUT;
                var transitionUrl = '';
                if (angular.isBoolean(transition) && transition === true) {
                    transitionUrl = '/transitions?expand=transitions.fields';
                    method = cons.POST;
                }
                self.sendRequest(method, 'issue/' + ticketKey + transitionUrl, callback, newData);
            },

            /**
             * set the username and password for the current request
             * this could change later to a token authentification
             * @param username
             * @param password
             */
            $auth: function (username, password) {
                self.username = username;
                self.password = password;
            },

            /**
             * get base information about a ticket
             * function still contains some warnings - should be fixed
             * @param ticket
             * @return ticket
             */
            $getBaseInformationForIssue: function (ticket) {

                return ticket;
            },


            query: function (method, query, callback, data) {
                var result = this.sendRequest(method, query, callback, data);
                if (result === false) {
                    $window.alert("It wasn't possible to get jira url " + self.url + query + 'with username ' + self.username);
                }
            },

            sendRequest: function (method, query, callback, data) {
                /**
                 * start to build the header
                 */
                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                /**
                 * add authorization
                 */
                if (angular.isString(self.username)) {
                    var credential = $base64.encode(self.username + ':' + self.password);
                    config.headers['Authorization'] = 'Basic ' + credential;
                }

                /**
                 * set Content-Length header
                 */
                config.headers['Content-Length'] = data.length;

                if (method === cons.GET) {
                    config.params = data;
                    var successCallback = function (data, status, headers, config) {
                        if (data === '') {
                            $window.alert('JIRA Rest server returns unexpected result.');
                        } else {
                            callback(data);
                        }
                    };
                    $http.get(self.url, config).success(function (data, status, headers, config) {
                        successCallback(data, status, headers, config);
                    });
                } else {
                    config.data = data;
                    $http({
                        method: method,
                        headers: config.headers,
                        data: config.data
                    }).success(function (data, status, headers, config) {
                        successCallback(data, status, headers, config);
                    });
                }
            }


        };
    };
    
    this.setUrl = function (url) {
        this.url = url;
    };

    this.setUrlArray = function (urlArray) {
        this.urlArray = urlArray;
    };
});