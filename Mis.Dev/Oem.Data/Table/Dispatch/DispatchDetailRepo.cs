namespace Oem.Data.Table.Dispatch
{
    public class DispatchDetailRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 订单明细Id
        /// </summary>
        public long OrderDetailsId { get; set; }
        
        /// <summary>
        /// 数量
        /// </summary>
        public long Amount { get; set; } 
    }
}