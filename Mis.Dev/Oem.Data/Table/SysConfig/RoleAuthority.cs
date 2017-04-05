﻿using System;

namespace Oem.Data.Table.SysConfig
{
    /// <summary>
    /// 角色权限
    /// </summary>
    public class RoleAuthority
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
        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime AddDate { get; set; }
        /// <summary>
        /// 添加用户Id
        /// </summary>
        public long AddUserId { get; set; }
    }
}