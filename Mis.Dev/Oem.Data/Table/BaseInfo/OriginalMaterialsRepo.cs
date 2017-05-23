namespace Oem.Data.Table.BaseInfo
{
    /// <summary>
    /// 原材料
    /// </summary>
    public class OriginalMaterialsRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        
        /// <summary>
        /// 类型
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// 颜色
        /// </summary>
        public string Color { get; set; }
        
        /// <summary>
        /// 规格
        /// </summary>
        public string Format { get; set; }
        
        /// <summary>
        /// 单位
        /// </summary>
        public string Unit { get; set; }
        
        /// <summary>
        /// 仓库名称
        /// </summary>
        public string WarehouseName { get; set; }
        
        /// <summary>
        /// 库位编号
        /// </summary>
        public string WarehouseNumber { get; set; }
        
        /// <summary>
        /// 分类
        /// </summary>
        public string Sort { get; set; }
        
        /// <summary>
        /// 系列号
        /// </summary>
        public string SerialNumber { get; set; }
        
        /// <summary>
        /// 供应商Id
        /// </summary>
        public long SupplerId { get; set; }
        
        /// <summary>
        /// 在库数量
        /// </summary>
        public long WarehousesAmount { get; set; }
        
        /// <summary>
        /// 碎料仓库数量
        /// </summary>
        public long ShreddedWarehousesAmount { get; set; }
        
        /// <summary>
        /// 库存仓库数量
        /// </summary>
        public long StockWarehouseAmount { get; set; }
        
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
    }
}