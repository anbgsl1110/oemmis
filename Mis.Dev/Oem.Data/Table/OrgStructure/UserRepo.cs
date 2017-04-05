using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oem.Data.Table.OrgStructure
{
    /// <summary>
    /// 用户对象
    /// </summary>
    public class UserRepo
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 用户密码
        /// </summary>
        public string Password { get; set; }
    }
}
