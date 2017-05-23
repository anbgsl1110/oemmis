using System;

namespace Oem.Data.Table.Order
{
    public class RequisitionRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 申购编号
        /// </summary>
        public string RequisitionNumber { get; set; }
        
        /// <summary>
        /// 操作用户Id
        /// </summary>
        public long Operator { get; set; }
        
        /// <summary>
        /// 申购时间
        /// </summary>
        public DateTime RequisitionDate { get; set; }
        
        /// <summary>
        /// 申购状态
        /// </summary>
        public int RequisitionStatus { get; set; }
        
        /// <summary>
        /// 录入时间
        /// </summary>
        public DateTime CreateTime { get; set; }
    }
}