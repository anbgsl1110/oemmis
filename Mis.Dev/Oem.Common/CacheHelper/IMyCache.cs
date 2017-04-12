
namespace Oem.Common.CacheHelper
{
    /// <summary>
    /// 个人缓存信息
    /// </summary>
    public interface IMyCache
    {
        /// <summary>
        /// 设置项
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <typeparam name="T"></typeparam>
        void Set<T>(string key, T value);

        /// <summary>
        /// 获取项
        /// </summary>
        /// <param name="key"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        T Get<T>(string key);

        /// <summary>
        /// 缓存索引器
        /// </summary>
        /// <param name="key"></param>
        object this[string key] { get; set; }

        /// <summary>
        ///清空项
        /// </summary>
        /// <param name="sessionId"></param>
        void Clear(string sessionId = null);

        /// <summary>
        /// 获取个人sessionId
        /// </summary>
        /// <returns></returns>
        string GetSessionId();
    }
}