namespace Oem.Data.Table.Repertory
{
    public class WarehouseManagerDetailRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        ///仓库操作Id
        /// </summary>
        public long WarehouseManagerId { get; set; }
        
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