namespace Oem.Data.Table.Order
{
    public class RequisitionDetailsRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 申购Id
        /// </summary>
        public long RequisitionId { get; set; }
        
        /// <summary>
        /// 订单Id
        /// </summary>
        public long OrderId { get; set; }
    }
}