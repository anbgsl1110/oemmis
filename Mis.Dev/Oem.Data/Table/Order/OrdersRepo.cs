using System;

namespace Oem.Data.Table.Order
{
    public class OrdersRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 订单编号
        /// </summary>
        public string OrderNumber { get; set; }
        
        /// <summary>
        /// 系列号
        /// </summary>
        public string SerialNumber { get; set; }
            
        /// <summary>
        /// 公司Id
        /// </summary>
        public long CompanyId { get; set; }
        
        /// <summary>
        /// 合计数量
        /// </summary>
        public long TotalAmount { get; set; }
        
        /// <summary>
        /// 操作用户Id
        /// </summary>
        public long Operator { get; set; }
        
        /// <summary>
        /// 订单时间
        /// </summary>
        public DateTime OrderDate { get; set; }
        
        /// <summary>
        /// 订单状态
        /// </summary>
        public int OrderStatus { get; set; }
        
        /// <summary>
        /// 录入时间
        /// </summary>
        public DateTime CreateTime { get; set; }
    }
}