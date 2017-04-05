using System;

namespace Oem.Data.Table.SysSetting
{
    /// <summary>
    /// 日志对象
    /// </summary>
    public class LogRepo
    {
        /// <summary>
        /// 日志主键
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// 机构Id
        /// </summary>
        public long OrgId { get; set; }
        /// <summary>
        /// 操作Id类型
        /// </summary>
        public string OperationIdType { get; set; }
        /// <summary>
        /// 操作Id集合
        /// </summary>
        public string OperationIds { get; set; }
        /// <summary>
        /// 用户Id
        /// </summary>
        public long UserId { get; set; }
        /// <summary>
        /// Ip
        /// </summary>
        public string Ip { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 操作结果
        /// </summary>
        public string OperationResult { get; set; }
        /// <summary>
        /// 操作时间
        /// </summary>
        public DateTime OperationDate { get; set; }
    }
}