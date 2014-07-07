package de.jirakanbancards.domain;

/**
 * Author: clohmann Date: 07.07.14 Time: 13:12
 */
public class Priority {

    private int id;
    private String self;
    private String iconUrl;
    private String name;

    public int getId() {

        return id;
    }

    public void setId(final int id) {

        this.id = id;
    }

    public String getSelf() {

        return self;
    }

    public void setSelf(final String self) {

        this.self = self;
    }

    public String getIconUrl() {

        return iconUrl;
    }

    public void setIconUrl(final String iconUrl) {

        this.iconUrl = iconUrl;
    }

    public String getName() {

        return name;
    }

    public void setName(final String name) {

        this.name = name;
    }
}
