package de.jirakanbancards.domain;

import static com.google.common.collect.Lists.newArrayList;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.google.common.base.Function;
import com.google.common.collect.Maps;

import com.sun.istack.internal.Nullable;

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

    public Map<String, List<Ticket>> getTicketsByEpics() {

        return TICKETS_BY_EPICS.apply(this.issues);
    }

    @JsonIgnore
    private static final Function<List<Ticket>, Map<String, List<Ticket>>> TICKETS_BY_EPICS =
        new Function<List<Ticket>, Map<String, List<Ticket>>>() {

            @Override
            public Map<String, List<Ticket>> apply(@Nullable final List<Ticket> input) {

                final Map<String, List<Ticket>> epics = Maps.newHashMap();
                for (final Ticket ticket : input) {
                    if (epics.containsKey(ticket.getFields().getEpicLink())) {
                        epics.get(ticket.getFields().getEpicLink()).add(ticket);
                    } else {
                        epics.put(ticket.getFields().getEpicLink(), newArrayList(ticket));
                    }
                }

                return epics;
            }
        };
}
