namespace Oem.Data.Table.Order
{
    public class PurchaseDetailsRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 采购Id
        /// </summary>
        public long PurchaseId { get; set; }
        
        /// <summary>
        /// 原材料Id
        /// </summary>
        public long OriginalMaterialsId { get; set; }
        
        /// <summary>
        /// 数量
        /// </summary>
        public long Amount { get; set; }
    }
}