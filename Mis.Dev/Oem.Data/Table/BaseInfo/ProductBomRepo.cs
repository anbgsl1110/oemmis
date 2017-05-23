namespace Oem.Data.Table.BaseInfo
{
    public class ProductBomRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 产品Id
        /// </summary>
        public long ProductId { get; set; }
        
        /// <summary>
        /// 原材料Id
        /// </summary>
        public long OriginalMaterialsId { get; set; }
        
        /// <summary>
        /// Bom数量
        /// </summary>
        public long BomAmount { get; set; }
    }
}