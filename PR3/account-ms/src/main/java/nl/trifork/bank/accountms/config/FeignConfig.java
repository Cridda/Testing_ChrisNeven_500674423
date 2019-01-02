package nl.trifork.bank.accountms.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.resource.OAuth2AccessDeniedException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor oAuthRequestInterceptor() {
        return new OAuthRequestInterceptor();
    }

    public static class OAuthRequestInterceptor implements RequestInterceptor {

        @Value("${security.oauth2.client.client-id}")
        String clientId;
        @Value("${security.oauth2.client.client-secret}")
        String clientSecret;
        @Value("${security.oauth2.client.grant-type}")
        String grantType;
        @Value("${security.oauth2.client.access-token-uri}")
        String accessTokenUri;

        @Override
        public void apply(RequestTemplate requestTemplate) {
            RestTemplate restTemplate = new RestTemplate();

            HashMap<String, Object> body = new HashMap();
            body.put("client_id", this.clientId);
            body.put("client_secret", this.clientSecret);
            body.put("grant_type", this.grantType);

            HashMap<String, String> results = restTemplate.postForObject(this.accessTokenUri, body, HashMap.class, new HashMap<String, String>());

            if(results.containsKey("access_token")) requestTemplate.header("Authorization", "Bearer " + results.get("access_token"));
            else throw new OAuth2AccessDeniedException("Failed to insert OAuth token into request.");
        }
    }

}
