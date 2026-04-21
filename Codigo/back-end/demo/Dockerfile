# Etapa 1: Build (Compilação)
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copiar os arquivos de configuração do Gradle
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

# Dar permissão e baixar dependências
RUN chmod +x gradlew
RUN ./gradlew --no-daemon dependencies

# Copiar o código fonte e compilar
COPY src src
RUN ./gradlew --no-daemon clean assemble

# Etapa 2: Runtime (Execução) - Agora com Java 21
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# O Gradle do Micronaut coloca o JAR em build/libs/
# Usamos o wildcard *.jar para pegar o arquivo gerado (geralmente o shadowJar ou o AllJar)
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]