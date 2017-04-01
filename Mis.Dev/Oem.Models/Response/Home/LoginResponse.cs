using System;
using System.Collections.Generic;
using System.Text;

namespace Oem.Models.Response.Home
{
    /// <summary>
    /// 登录响应对象
    /// </summary>
    public class LoginResponse
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        public long UserId { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
    }
}
