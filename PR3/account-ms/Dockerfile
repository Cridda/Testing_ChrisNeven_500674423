FROM openjdk:8-alpine
ADD target/account-ms.jar /root/account-ms.jar
COPY entrypoint-account.sh /root/entrypoint.sh
RUN chmod +x /root/entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/root/entrypoint.sh"]
