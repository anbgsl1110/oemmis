using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oem.Data.Enum;

namespace Oem.Models.Resonse
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Response<T>
    {
        /// <summary>
        /// 
        /// </summary>
        public short Status
        {
            get
            {
                return (short)(Type == ErrorTypeEnum.NoError ? 1 : 0);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        public ErrorTypeEnum Type { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public T Data { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="type"></param>
        /// <param name="data"></param>
        public Response(ErrorTypeEnum type, T data)
        {
            Type = type;
            Data = data;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        public Response(T data)
        {
            Type = ErrorTypeEnum.NoError;
            Data = data;
        }
    }
    /// <summary>
    /// 
    /// </summary>
    public class Response
    {
        /// <summary>
        /// 
        /// </summary>
        public short Status
        {
            get
            {
                return (short)(Type == ErrorTypeEnum.NoError ? 1 : 0);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        public ErrorTypeEnum Type { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="type"></param>
        public Response(ErrorTypeEnum type)
        {
            Type = type;
        }
        /// <summary>
        /// 
        /// </summary>
        public Response()
        {
            Type = ErrorTypeEnum.NoError;
        }
    }
}
