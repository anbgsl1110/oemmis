using System.Collections.Generic;
using Oem.Data.Enum;
namespace Oem.Web.Helpers
{
    /// <summary>
    /// 错误码相关 -- 目前未使用
    /// </summary>
    public static class ErrorHelper
    {
        private static readonly IDictionary<ErrorTypeEnum, string> ErrorMessages = new Dictionary<ErrorTypeEnum, string>()
        {
            {ErrorTypeEnum.NoError, ""}
        };
        /// <summary>
        /// 
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static string GetErrorMessage(ErrorTypeEnum type)
        {
            return ErrorMessages[type];
        }
    }
}