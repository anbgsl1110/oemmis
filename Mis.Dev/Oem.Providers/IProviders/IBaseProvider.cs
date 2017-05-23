using System.Collections.Generic;

namespace Oem.Providers.IProviders
{
    /// <summary>
    /// 数据服务基础提供接口
    /// </summary>
    public interface IBaseProvider
    {
        /// <summary>
        /// 根据过滤条件查询列表数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        IEnumerable<T> Select<T>(IDictionary<string, object> parameters);
    }
}