using System;

namespace Oem.Data.Table.Repertory
{
    public class WarehouseOprationRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 操作编号
        /// </summary>
        public string OperationNumber { get; set; }
        
        /// <summary>
        /// 操作时间
        /// </summary>
        public DateTime OperattionTime { get; set; }
        
        /// <summary>
        /// 合计数量
        /// </summary>
        public long TotalAmount { get; set; }
        
        /// <summary>
        /// 仓库Id
        /// </summary>
        public long WarehouseId { get; set; }
        
        /// <summary>
        /// 辅助编号
        /// </summary>
        public string AuxiliaryNumber { get; set; }
    }
}