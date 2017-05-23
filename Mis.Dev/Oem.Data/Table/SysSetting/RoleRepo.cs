using System;

namespace Oem.Data.Table.SysSetting
{
    /// <summary>
    /// 角色对象
    /// </summary>
    public class RoleRepo
    {
        /// <summary>
        /// 角色Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 角色名称
        /// </summary>
        public string RoleName { get; set; }

        /// <summary>
        /// 机构Id
        /// </summary>
        public long OrgId { get; set; }

        /// <summary>
        /// 是否系统账户
        /// </summary>
        public Boolean IsSys { get; set; }

        /// <summary>
        /// 角色说明
        /// </summary>
        public string Description { get; set; }
    }
}