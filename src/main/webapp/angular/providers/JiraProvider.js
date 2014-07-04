'use strict';

angular.module('jiraKanbanCards')
    .factory('jira', ['cons', '$base64', '$window', '$http', function (cons, $base64, $window, $http) {

        this.url = 'https://techjira.zalando.net/rest/api/';
        this.username = '';
        this.password = '';
        this.fields = 'all*';

        var self = this;

        return {

            getIssuesByJql: function (jql, callback, fields) {
                if (!fields) {
                    fields = '*all';
                }
                var query = 'search?fields=' + fields + '&maxResults=100&jql=' + encodeURIComponent(jql).replace(/%252F/g, '/');
                this.sendRequest(cons.GET, query, callback, fields);
            },

            getVersionsByProject: function (projectKey, callback) {
                this.sendRequest(cons.GET, 'project/' + projectKey + '/versions?', callback);
            },

            updateTicket: function (ticketKey, newData, transition, callback) {
                var method = cons.PUT;
                var transitionUrl = '';
                if (angular.isBoolean(transition) && transition === true) {
                    transitionUrl = '/transitions?expand=transitions.fields';
                    method = cons.POST;
                }
                this.sendRequest(method, 'issue/' + ticketKey + transitionUrl, callback, newData);
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
                    $window.alert('It wasn\'t possible to get jira url ' + self.url + query + 'with username ' + self.username);
                }
            },

            sendRequest: function (method, query, callback, data) {
                /**
                 * start to build the header
                 */
                var config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'X-Requested-With, content-type'
                    }
                };

                /**
                 * add authorization
                 */
                if (angular.isString(self.username)) {
                    var credential = $base64.encode(self.username + ':' + self.password);
                    config.headers.Authorization = 'Basic ' + credential;
                }

                /**
                 * set Content-Length header
                 */
                config.headers['Content-Length'] = data.length;

                $http.defaults.useXDomain = true;

                if (method === cons.GET) {
                    config.params = data;
                    var successCallback = function (data, status, headers, config) {
                        if (data === '') {
                            $window.alert('JIRA Rest server returns unexpected result.');
                        } else {
                            callback(data);
                        }
                    };
                    $http.get(self.url + query, config).success(function (data, status, headers, config) {
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
            },

            setUrl: function (url) {
                self.url = url;
            }
        };
    }]);