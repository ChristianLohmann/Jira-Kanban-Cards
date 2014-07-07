package de.jirakanbancards.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Author: clohmann Date: 07.07.14 Time: 12:19
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Fields {

    private Priority priority;
    private IssueType issueType;
    private String key;
    private JiraUser reporter;
    private JiraUser assignee;
    private String time;
    @JsonProperty("epickey")
    private String customfield_11100;
    @JsonProperty("rank")
    private String customfield_10004;

    private String summary;

    public String getSummary() {

        return summary;
    }

    public void setSummary(final String summary) {

        this.summary = summary;
    }

    public IssueType getIssueType() {

        return issueType;
    }

    public void setIssueType(final IssueType issueType) {

        this.issueType = issueType;
    }

    public String getKey() {

        return key;
    }

    public void setKey(final String key) {

        this.key = key;
    }

    public JiraUser getReporter() {

        return reporter;
    }

    public void setReporter(final JiraUser reporter) {

        this.reporter = reporter;
    }

    public JiraUser getAssignee() {

        return assignee;
    }

    public void setAssignee(final JiraUser assignee) {

        this.assignee = assignee;
    }

    public String getTime() {

        return time;
    }

    public void setTime(final String time) {

        this.time = time;
    }

    public String getCustomfield_11100() {

        return customfield_11100;
    }

    public void setCustomfield_11100(final String customfield_11100) {

        this.customfield_11100 = customfield_11100;
    }

    public String getCustomfield_10004() {

        return customfield_10004;
    }

    public void setCustomfield_10004(final String customfield_10004) {

        this.customfield_10004 = customfield_10004;
    }

    public Priority getPriority() {

        return priority;
    }

    public void setPriority(final Priority priority) {

        this.priority = priority;
    }
}
