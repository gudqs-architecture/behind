package cn.gudqs.util;

import cn.gudqs.helper.SpringContextUtil;
import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.http.ProtocolType;
import com.aliyuncs.profile.DefaultProfile;

import java.util.Map;

/**
 * @author wq
 * @date 2019-05-27
 * @description 阿里云短信接口
 */
public class AliSmsUtil {

    private static DefaultProfile profile;
    private static String defaultSignName;

    static {
        String aliAk = SpringContextUtil.getEnvironmentProperty("ali.ak");
        String aliSk = SpringContextUtil.getEnvironmentProperty("ali.sk");
        defaultSignName = SpringContextUtil.getEnvironmentProperty("ali.sms.signName");
        profile = DefaultProfile.getProfile("default", aliAk, aliSk);
    }

    public static String sendSms(String phoneNumber, String tplCode, Map<String, Object> params) throws ClientException {
        return sendSms(phoneNumber, defaultSignName, tplCode, params);
    }

    public static String sendSms(String phoneNumber, String signName, String tplCode, Map<String, Object> params) throws ClientException {
        IAcsClient client = new DefaultAcsClient(profile);
        CommonRequest request = new CommonRequest();
        request.setProtocol(ProtocolType.HTTPS);
        request.setMethod(MethodType.POST);
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");
        request.putQueryParameter("PhoneNumbers", phoneNumber);
        request.putQueryParameter("SignName", signName);
        request.putQueryParameter("TemplateCode", tplCode);
        request.putQueryParameter("TemplateParam", JsonUtils.getJsonString(params));
        CommonResponse response = client.getCommonResponse(request);
        LoggerUtil.debug(response.getData(), AliSmsUtil.class);
        return response.getData();
    }

}
