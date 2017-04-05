using System;

namespace Oem.Data.Table.SysConfig
{
    /// <summary>
    /// 角色权限
    /// </summary>
    public class RoleAuthorityRepo
    {
        /// <summary>
        /// 主键Id
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// 角色Id
        /// </summary>
        /// <returns></returns>
        public long RoleId { get; set; }
        /// <summary>
        /// 权限Id
        /// </summary>
        public long AuthorityId { get; set; }
        /// <summary>
        /// 机构Id
        /// </summary>
        public long OrgId { get; set; }
    }
}