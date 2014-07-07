package de.jirakanbancards.domain;

import java.util.List;

/**
 * Author: clohmann Date: 07.07.14 Time: 11:44
 */
public class JiraSearchResult {

    private String expand;

    private int startAt;

    private int maxResults;

    private int total;

    private List<Ticket> issues;

    public String getExpand() {

        return expand;
    }

    public void setExpand(final String expand) {

        this.expand = expand;
    }

    public int getStartAt() {

        return startAt;
    }

    public void setStartAt(final int startAt) {

        this.startAt = startAt;
    }

    public int getMaxResults() {

        return maxResults;
    }

    public void setMaxResults(final int maxResults) {

        this.maxResults = maxResults;
    }

    public int getTotal() {

        return total;
    }

    public void setTotal(final int total) {

        this.total = total;
    }

    public List<Ticket> getIssues() {

        return issues;
    }

    public void setIssues(final List<Ticket> issues) {

        this.issues = issues;
    }
}
