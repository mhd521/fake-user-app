# Stage 1: Build the JAR inside a Maven container
FROM maven:3.8.4-openjdk-11-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the lightweight runtime image
FROM eclipse-temurin:11-jre-focal
WORKDIR /app

# Senior Signal: Security (Run as non-root)
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring

# Copy only the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
