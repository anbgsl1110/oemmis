using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oem.Models.Item
{
    /// <summary>
    /// 登录用户信息
    /// </summary>
    public class LoginUserInfo
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
