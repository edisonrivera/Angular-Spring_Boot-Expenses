package expenses_services;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ExpensesApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExpensesApplication.class, args);
    }

    @Bean
    WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/v1/**").allowedOrigins("http://localhost:4200")
				.allowedMethods("GET", "POST", "DELETE", "PUT");
			}
		};
	}
}
