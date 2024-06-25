FROM openjdk:17-jdk-alpine
COPY target/expenses.jar expenses.jar
ENTRYPOINT ["java", "-jar", "expenses.jar"]
