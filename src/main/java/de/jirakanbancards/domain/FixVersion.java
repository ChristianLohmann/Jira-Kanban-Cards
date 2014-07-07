package de.jirakanbancards.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by christianl on 08.07.14.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class FixVersion {

    private String description;
    private String name;
    private boolean released;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isReleased() {
        return released;
    }

    public void setReleased(boolean released) {
        this.released = released;
    }
}
