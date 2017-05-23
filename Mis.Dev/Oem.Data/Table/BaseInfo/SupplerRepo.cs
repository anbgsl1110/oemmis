namespace Oem.Data.Table.BaseInfo
{
    public class SupplerRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 供应商名称
        /// </summary>
        public string SupplerName { get; set; }
        
        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }
        
        /// <summary>
        /// 联系电话
        /// </summary>
        public string Phone { get; set; }
        
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
    }
}