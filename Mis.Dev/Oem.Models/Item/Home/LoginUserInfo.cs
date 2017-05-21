using Oem.Data.Enum;
using Oem.Data.Table.SysSetting;

namespace Oem.Models.Item.Home
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
        
        /// <summary>
        /// 用户权限
        /// </summary>
        public AuthorityEnum[] UserAuthority { get; set; }
        
        /// <summary>
        /// 用户角色
        /// </summary>
        public RoleRepo[] UserRole { get; set; }
        
        /// <summary>
        /// 用户机构
        /// </summary>
        public long OrgId { get; set; }
    }
}
