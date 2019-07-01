package cn.gudqs.helper;

import cn.gudqs.business.common.entity.SysDictionaryModel;
import cn.gudqs.business.common.service.ISysDictionaryService;

import java.util.List;

/**
 * @author wq
 * @date 2019-05-06
 * @description qing-yuan-api
 */
public class DictionaryUtil<K, V> extends MapCache<K, V> {

    private static DictionaryUtil<String, SysDictionaryModel> instance;
    private static DictionaryUtil<String, List<SysDictionaryModel>> parentCodeInstance;

    private ISysDictionaryService sysDictionaryService;

    private Integer type;

    private DictionaryUtil(Integer type) {
        this();
        this.type = type;
    }

    private DictionaryUtil() {
        sysDictionaryService = SpringContextUtil.getBean(ISysDictionaryService.class);
    }

    public static DictionaryUtil<String, SysDictionaryModel> getInstance() {
        if (instance == null) {
            instance = new DictionaryUtil<>(0);
        }
        return instance;
    }

    public static DictionaryUtil<String, List<SysDictionaryModel>> getParentInstance() {
        if (parentCodeInstance == null) {
            parentCodeInstance = new DictionaryUtil<>(1);
        }
        return parentCodeInstance;
    }

    public static String findValByCode(String code) {
        return findValByCode(code, code);
    }
    public static String findValByCode(String code, String defaultVal) {
        SysDictionaryModel byCode = findByCode(code);
        if (byCode != null) {
            return byCode.getDictionaryValue();
        } else {
            return defaultVal;
        }
    }

    public static SysDictionaryModel findByCode(String code) {
        return getInstance().get(code);
    }

    public static List<SysDictionaryModel> findByParentCode(String parentCode) {
        return getParentInstance().get(parentCode);
    }

    public static void setFromParent(List<SysDictionaryModel> dictionaryModels) {
        for (SysDictionaryModel dictionaryModel : dictionaryModels) {
            getInstance().set(dictionaryModel.getDictionaryCode(), dictionaryModel);
        }
    }

    public static void set(SysDictionaryModel dictionaryModel) {
        if (dictionaryModel != null) {
            getInstance().set(dictionaryModel.getDictionaryCode(), dictionaryModel);
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public V loadDataFromDb(K key) {
        if (key instanceof String) {
            String key0 = (String) key;
            if (type == 1) {
                return (V) loadDicListByParent(key0);
            } else if (type == 0) {
                return (V) loadDicData(key0);
            }
        }
        return super.loadDataFromDb(key);
    }

    private List<SysDictionaryModel> loadDicListByParent(String parentCode) {
        List<SysDictionaryModel> sysDictionaryModels = sysDictionaryService.findByParentCode(parentCode);
        if (sysDictionaryModels.size() > 0) {
            setFromParent(sysDictionaryModels);
            return sysDictionaryModels;
        } else {
            return null;
        }
    }

    private SysDictionaryModel loadDicData(String code) {
        return sysDictionaryService.selectOne(new SysDictionaryModel(code));
    }
}
