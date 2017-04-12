using System;

namespace Oem.Common.CacheHelper
{
    public class MyCache : IMyCache
    {
        public ICacheService Cache { get; set; };
        public readonly int SessionHour;
        public readonly string CookieDomain;
        public readonly string PreFix;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="cacheService"></param>
        public MyCache(ICacheService cacheService)
        {
            Cache = cacheService;
            SessionHour = 12;
            CookieDomain = @"localhost";
            PreFix = @"OemMis";
        }

        public void Set<T>(string key, T value)
        {
            throw new NotImplementedException();
        }

        public T Get<T>(string key)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 缓存索引器
        /// </summary>
        /// <param name="key"></param>
        public object this[string key]
        {
            get => Get<object>(key);
            set => Set(key, value);
        }

        public void Clear(string sessionId = null)
        {
            throw new NotImplementedException();
        }

        public string GetSessionId()
        {
            try
            {
                var httpCookie = @"";
                if (string.IsNullOrWhiteSpace(httpCookie))
                {
                    return httpCookie;
                }
                return null;
            }
            catch (Exception e)
            {
                LogHelper.LogHelper logHelper = new LogHelper.LogHelper();
                logHelper.WriteLog("获取MySessionId失败",e);
                throw;
            }
        }

        private void SetSessionId()
        {

        }
    }
}