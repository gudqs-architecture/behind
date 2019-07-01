package cn.gudqs.util.crypto;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;

/**
 * @author wq
 * @date 2018/9/19
 * @description 用户token验证的工具类
 */
public class JwtUtils {

    /**
     * 校验token是否正确
     *
     * @param token 密钥
     * @return 是否正确
     */
    public static Map<String, Claim> verify(String token, String secret) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        DecodedJWT jwt = verifier.verify(token);
        return jwt.getClaims();
    }

    /**
     * 生成签名
     *
     * @return 加密的token
     */
    public static String sign(Map<String, String> data, int expire, int unit, String secret) {
        Date createDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.add(unit, expire);
        Date expireDate = calendar.getTime();
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTCreator.Builder builder = JWT.create();
        if (data != null) {
            for (String key : data.keySet()) {
                builder.withClaim(key, data.get(key));
            }
        }
        return builder
                .withIssuedAt(createDate)
                .withExpiresAt(expireDate)
                .sign(algorithm);

    }
}

