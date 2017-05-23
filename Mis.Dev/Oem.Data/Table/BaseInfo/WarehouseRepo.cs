namespace Oem.Data.Table.BaseInfo
{
    public class WarehouseRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 仓库编号
        /// </summary>
        public string WarehouseNumber { get; set; }
        
        /// <summary>
        /// 仓库名称
        /// </summary>
        public string WarehouseName { get; set; }
        
        /// <summary>
        /// 仓库地址
        /// </summary>
        public string Address { get; set; }
        
        /// <summary>
        /// 仓库类型
        /// </summary>
        public string WarehouseType { get; set; }
        
        /// <summary>
        /// 材料类型
        /// </summary>
        public string MaterialsType { get; set; }
        
        /// <summary>
        /// 仓管员
        /// </summary>
        public string WarehouseManager { get; set; }
        
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
    }
}