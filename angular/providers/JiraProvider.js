'use strict';

jiraKanbanCards.provider('JiraProvider', function () {

    this.url = '/';
    this.urlArray = '/';
    this.username = '';
    this.password = '';

    this.$get = function () {
        var url = this.url;
        var urlArray = this.urlArray;

        return {
            invoke: function () {

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

});

jiraKanbanCards.config(function (JiraProvider) {
    JiraProvider.setUrl('/');
    JiraProvider.setUrlArray('/');
});