using System.Collections.Generic;
using Oem.Data.Enum;
using Oem.Data.ServiceModel;

namespace Oem.Services.IServices
{
    /// <summary>
    /// 服务接口基类
    /// </summary>
    public interface IBaseService
    {
        /// <summary>
        /// 根据主键id获取数据
        /// </summary>
        /// <param name="t"></param>
        /// <param name="id"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        ServiceResult<ServiceStateEnum, T> Select<T>(T t, long id);

        /// <summary>
        /// 分页查询列表记录
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(T t, long pageIndex, long pageSize);

        /// <summary>
        /// 根据过滤条件查询列表数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(IDictionary<string, object> parameters);

        /// <summary>
        /// 插入数据
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        ServiceResult<ServiceStateEnum> Insert<T>(T t);
        
        /// <summary>
        /// 插入数据(返回插入记录的主键)
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        ServiceResult<ServiceStateEnum, int> InsertWithIdentity<T>(T t);

        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="t"></param>
        /// <param name="id"></param>
        /// <typeparam name="T"></typeparam>
        ServiceResult<ServiceStateEnum> Delete<T>(T t, long id);

        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        ServiceResult<ServiceStateEnum> Update<T>(T t);
    }
}