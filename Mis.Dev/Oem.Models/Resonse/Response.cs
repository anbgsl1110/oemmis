using Oem.Data.Enum;

namespace Oem.Models.Resonse
{
    /// <summary>
    /// 泛型响应对象
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Response<T>
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="type"></param>
        /// <param name="data"></param>
        public Response(ErrorTypeEnum type, T data)
        {
            Type = type;
            Data = data;
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="data"></param>
        public Response(T data)
        {
            Type = ErrorTypeEnum.NoError;
            Data = data;
        }
        /// <summary>
        /// 状态
        /// </summary>
        public short Status
        {
            get
            {
                return (short)(Type == ErrorTypeEnum.NoError ? 1 : 0);
            }
        }
        /// <summary>
        /// 错误枚举
        /// </summary>
        public ErrorTypeEnum Type { get; set; }
        /// <summary>
        /// 响应信息
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// 响应数据
        /// </summary>
        public T Data { get; set; }

    }
    /// <summary>
    /// 响应对象
    /// </summary>
    public class Response
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="type"></param>
        public Response(ErrorTypeEnum type)
        {
            Type = type;
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        public Response()
        {
            Type = ErrorTypeEnum.NoError;
        }

        /// <summary>
        /// 状态
        /// </summary>
        public short Status
        {
            get
            {
                return (short)(Type == ErrorTypeEnum.NoError ? 1 : 0);
            }
        }

        /// <summary>
        /// 错误枚举
        /// </summary>
        public ErrorTypeEnum Type { get; set; }
    }
}
