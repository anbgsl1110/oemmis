using System;

namespace Oem.Data.Table.OrgUser
{
    /// <summary>
    /// 机构对象
    /// </summary>
    public class OrgRepo
    {
        /// <summary>
        /// 机构Id
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// 机构名称
        /// </summary>
        public string OrgName { get; set; }
        /// <summary>
        /// 添加用户Id
        /// </summary>
        public long UserId { get; set; }
        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime AddDate { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
    }
}