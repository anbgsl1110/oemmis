using System;
using System.Collections.Generic;
using System.Text;
using Oem.Data.Enum;
using Oem.Data.Table.SysSetting;

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

        /// <summary>
        /// 机构Id
        /// </summary>
        public long OrgId { get; set; }

        /// <summary>
        /// 用户权限
        /// </summary>
        public AuthorityEnum[] UserAuthority { get; set; }

        /// <summary>
        /// 用户角色
        /// </summary>
        public RoleRepo[] UserRole { get; set; }
    }
}
