using System;

namespace Oem.Data.Table.SysConfig
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
        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime AddDate { get; set; }
        /// <summary>
        /// 添加用户Id
        /// </summary>
        public string AddUserId { get; set; }
    }
}