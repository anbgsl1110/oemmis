namespace Oem.Data.ServiceModel
{
    /// <summary>
    /// ServiceResult帮助类
    /// </summary>
    public static class ServiceResult
    {
        /// <summary>
        /// 创建服务结果对象
        /// </summary>
        /// <param name="state">状态</param>
        /// <typeparam name="T">返回状态的对象类型</typeparam>
        /// <returns></returns>
        public static ServiceResult<T> Create<T>(T state) where T : struct
        {
            return new ServiceResult<T>(state.Equals(default(T)), state);
        }

        /// <summary>
        /// 创建服务结果对象
        /// </summary>
        /// <param name="success">是否成功</param>
        /// <param name="state">状态</param>
        /// <typeparam name="T">返回状态的对象类型</typeparam>
        /// <returns></returns>
        public static ServiceResult<T> Create<T>(bool success, T state) where T : struct
        {
            return new ServiceResult<T>(success, state);
        }

        /// <summary>
        /// 返回服务结果对象
        /// </summary>
        /// <param name="state">状态</param>
        /// <param name="data">数据</param>
        /// <typeparam name="T">返回状态的对象类型</typeparam>
        /// <typeparam name="TU">返回数据的对象类型</typeparam>
        /// <returns></returns>
        public static ServiceResult<T, TU> Create<T, TU>(T state, TU data) where T : struct
        {
            return Create(state.Equals(default(T)), state, data);
        }

        /// <summary>
        /// 创建服务结果对象
        /// </summary>
        /// <param name="success">是否成功</param>
        /// <param name="state">状态</param>
        /// <param name="data">数据</param>
        /// <typeparam name="T">返回状态的对象类型</typeparam>
        /// <typeparam name="TU">返回数据的对象类型</typeparam>
        /// <returns></returns>
        public static ServiceResult<T, TU> Create<T, TU>(bool success, T state, TU data) where T : struct
        {
            return new ServiceResult<T, TU>(success, state, data);
        }
    }

    /// <summary>
    /// 表示返回服务结果
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ServiceResult<T> where T : struct
    {
        /// <summary>
        /// 是否成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public T State { get; set; }

        /// <summary>
        /// 构造函数
        /// </summary>
        public ServiceResult()
        {
            Success = true;
            State = default(T);
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="success">是否成功</param>
        /// <param name="state">状态</param>
        public ServiceResult(bool success, T state)
        {
            Success = success;
            State = state;
        }
    }

    /// <summary>
    /// 返回服务返回结果
    /// </summary>
    /// <typeparam name="T">返回状态的对象类型</typeparam>
    /// <typeparam name="TU">返回数据的对象类型</typeparam>
    public class ServiceResult<T, TU> : ServiceResult<T> where T : struct
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public ServiceResult() : base()
        {
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="success">是否成功</param>
        /// <param name="state">状态</param>
        public ServiceResult(bool success, T state) : base(success, state)
        {
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="success">是否成功</param>
        /// <param name="state">状态</param>
        /// <param name="data">数据</param>
        public ServiceResult(bool success, T state, TU data) : base(success, state)
        {
            Data = data;
        }

        /// <summary>
        /// 结果数据
        /// </summary>
        public TU Data { get; set; }
    }
}