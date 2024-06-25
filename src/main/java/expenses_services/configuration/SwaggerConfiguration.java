package expenses_services.configuration;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
    info=@Info(
            title = "Expenses API",
            description = "RestAPI for manage your expenses",
            termsOfService = "https://edisonrivera.github.io/",
            version = "1.0.0",
            contact = @Contact(name = "Edison Rivera", url = "https://edisonrivera.github.io/", email = "riveraeddy58@gmail.com")
    )
)
@Configuration
public class SwaggerConfiguration {
}
