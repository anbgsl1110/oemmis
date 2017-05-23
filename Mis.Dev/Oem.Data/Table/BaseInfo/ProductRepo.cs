namespace Oem.Data.Table.BaseInfo
{
    public class ProductRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 系列号
        /// </summary>
        public string SerialNumber { get; set; }
        
        /// <summary>
        /// 款式号
        /// </summary>
        public string StyleNumber { get; set; }
        
        /// <summary>
        /// 品名
        /// </summary>
        public string BrandName { get; set; }
        
        /// <summary>
        /// 颜色
        /// </summary>
        public string Color { get; set; }
        
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
    }
}