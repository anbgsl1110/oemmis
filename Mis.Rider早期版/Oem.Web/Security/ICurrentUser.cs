using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oem.Web.Security
{
    interface ICurrentUser
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        long UserId { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        string UserName { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        string Password { get; set; }
    }
}
