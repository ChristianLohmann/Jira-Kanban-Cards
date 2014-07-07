package de.jirakanbancards.resource;

import de.jirakanbancards.domain.Ticket;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

/**
 * Author: clohmann Date: 03.07.14 Time: 12:53
 */
@RestController
@RequestMapping("/jira")
public class JiraResource {

    @Value("jiraUrl")
    private String jiraUrl;

    private String customJiraUrl;

    private String auth;

    @RequestMapping(value = "/issuesByJql/{fields}/{jql}", method = RequestMethod.GET)
    @ResponseBody
    public List getIssuesByJql(@PathVariable("fields") final String fields,
                                 @PathVariable("jql") final String jql) {

        final String jiraUrl = customJiraUrl != null ? customJiraUrl : this.jiraUrl;
        try {
            String query = "/search?fields=" + fields + "&maxResults=100&jql="
                    + encodeURIComponent(jql).replaceAll("%252F", "/");
            RestTemplate rest = new RestTemplate();
            final ResponseEntity<List> exchange = rest.exchange(jiraUrl + query, HttpMethod.GET,
                    new HttpEntity<String>(createHeaders()), List.class);
            return exchange.getBody();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return newArrayli;
    }

    @RequestMapping(value = "/auth/{auth}", method = RequestMethod.GET)
    public void authenticate(@PathVariable("auth") final String auth) {

        this.auth = auth;
    }

    @RequestMapping(value = "/url", method = RequestMethod.GET)
    public void setJiraUrl(@RequestParam final String url) {
    }

    private String encodeURIComponent(final String jql) throws UnsupportedEncodingException {

        return URLEncoder.encode(jql, "UTF-8");
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
