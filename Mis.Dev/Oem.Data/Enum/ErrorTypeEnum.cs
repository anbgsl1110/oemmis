using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.ComponentModel;

namespace Oem.Data.Enum
{
    /// <summary>
    /// 错误枚举
    /// </summary>
    public enum ErrorTypeEnum
    {
        /// <summary>
        /// 正常
        /// </summary>
        [Description("正常")]
        NoError = 1,
        
        /// <summary>
        /// 错误
        /// </summary>
        [Description("错误")]
        Error = 0,

        #region 登录

        /// <summary>
        /// 用户名或密码错误
        /// </summary>
        [Description("用户名或密码错误")]
        LoginError = 25001

        #endregion
        
    }
}
