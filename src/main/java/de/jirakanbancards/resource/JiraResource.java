package de.jirakanbancards.resource;

import java.io.UnsupportedEncodingException;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.common.escape.Escaper;
import com.google.common.net.UrlEscapers;

import de.jirakanbancards.domain.JiraSearchResult;
import de.jirakanbancards.domain.Ticket;

/**
 * Author: clohmann Date: 03.07.14 Time: 12:53
 */
@RestController
@RequestMapping("/jira")
public class JiraResource {

    @Value("${jira.url}")
    private String jiraUrl;

    private String customJiraUrl;

    private String auth;

    @RequestMapping(value = "/issuesByJql/{fields}/{jql}", method = RequestMethod.GET)
    @ResponseBody
    public List<Ticket> getIssuesByJql(@PathVariable("fields") final String fields,
            @PathVariable("jql") final String jql) {

        final String jiraUrl = customJiraUrl != null ? customJiraUrl : this.jiraUrl;
        String query = "/search?fields=" + fields + "&maxResults=100&jql=" + jql;
        RestTemplate rest = new RestTemplate();
        final ResponseEntity<JiraSearchResult> exchange = rest.exchange(jiraUrl + query, HttpMethod.GET,
                new HttpEntity<String>(createHeaders()), JiraSearchResult.class);
        final JiraSearchResult body = exchange.getBody();
        return body.getIssues();
    }

    @RequestMapping(value = "/auth/{auth}", method = RequestMethod.GET)
    public void authenticate(@PathVariable("auth") final String auth) {

        this.auth = auth;
    }

    @RequestMapping(value = "/url", method = RequestMethod.GET)
    public void setJiraUrl(@RequestParam final String url) { }

    private String encodeURIComponent(final String jql) throws UnsupportedEncodingException {

        final Escaper escaper = UrlEscapers.urlPathSegmentEscaper();
        return escaper.escape(jql);
    }

    private HttpHeaders createHeaders() {

        final String auth = this.auth;

        return new HttpHeaders() {

            {
                String authHeader = "Basic " + auth;
                set("Authorization", authHeader);

                set("Content-Type", "application/json");
            }
        };
    }

}
