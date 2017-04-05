using System;

namespace Oem.Data.Table.SysSetting
{
    /// <summary>
    /// 权限对象
    /// </summary>
    public class AuthorityRepo
    {
        /// <summary>
        /// 权限Id
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// 权限值
        /// </summary>
        public long AuthorityValue { get; set; }
        /// <summary>
        /// 权限名称
        /// </summary>
        public string AuthorityName { get; set; }
    }
}