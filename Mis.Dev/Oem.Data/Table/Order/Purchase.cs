using System;
using Mysqlx.Expr;

namespace Oem.Data.Table.Order
{
    public class Purchase
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 采购编号
        /// </summary>
        public string PurchaseNumber { get; set; }
        
        /// <summary>
        /// 交货日
        /// </summary>
        public DateTime DeliveryDate { get; set; }
        
        /// <summary>
        /// 操作用户Id
        /// </summary>
        public long Operator { get; set; }
        
        /// <summary>
        /// 采购时间
        /// </summary>
        public DateTime PurchaseDate { get; set; }
        
        /// <summary>
        /// 采购状态
        /// </summary>
        public int PurchaseStatus { get; set; }
        
        /// <summary>
        /// 录入时间
        /// </summary>
        public DateTime CreateTime { get; set; }
    }
}