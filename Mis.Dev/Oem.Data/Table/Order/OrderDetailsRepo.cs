namespace Oem.Data.Table.Order
{
    public class OrderDetailsRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 订单Id
        /// </summary>
        public long OrderId { get; set; }
        
        /// <summary>
        /// 产品Id
        /// </summary>
        public long ProductId { get; set; } 
        
        /// <summary>
        /// 数量
        /// </summary>
        public long Amount { get; set; }
    }
}