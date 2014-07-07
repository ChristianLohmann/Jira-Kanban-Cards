package de.jirakanbancards.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Author: clohmann Date: 07.07.14 Time: 12:19
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Fields {

    private Priority priority;

    private IssueType issuetype;

    private String key;

    private JiraUser reporter;

    private JiraUser assignee;

    private String time;

    private String customfield_11100;

    private String customfield_10004;

    private String customfield_14531;

    private String customfield_14532;

    private String customfield_14533;

    private List<FixVersion> fixVersions;

    private String summary;

    public String getSummary() {

        return summary;
    }

    public void setSummary(final String summary) {

        this.summary = summary;
    }

    public IssueType getIssuetype() {

        return issuetype;
    }

    public void setIssuetype(final IssueType issuetype) {

        this.issuetype = issuetype;
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

    public String getCustomfield_14531() {
        return customfield_14531;
    }

    public void setCustomfield_14531(String customfield_14531) {
        this.customfield_14531 = customfield_14531;
    }

    public String getCustomfield_14533() {
        return customfield_14533;
    }

    public void setCustomfield_14533(String customfield_14533) {
        this.customfield_14533 = customfield_14533;
    }

    public String getEpicName() {
        return customfield_14532;
    }

    public String getEpicLink() {
        return customfield_14531;
    }

    public String getEpicStatus() {
        return customfield_14533;
    }

    public String getCustomfield_14532() {
        return customfield_14532;
    }

    public void setCustomfield_14532(String customfield_14532) {
        this.customfield_14532 = customfield_14532;
    }

    public List<FixVersion> getFixVersions() {
        return fixVersions;
    }

    public void setFixVersions(List<FixVersion> fixVersions) {
        this.fixVersions = fixVersions;
    }
}
