import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Author: Christian Lohmann Date: 03.07.14 Time: 12:47
 */

@Configuration
@EnableAutoConfiguration
@ComponentScan({ "de.jirakanbancards" })
public class JiraKanbanCardsWebApplication extends SpringBootServletInitializer {

    public static void main(final String[] args) throws Exception {

        SpringApplication.run(JiraKanbanCardsWebApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(final SpringApplicationBuilder application) {

        return application.sources(JiraKanbanCardsWebApplication.class);
    }

}
