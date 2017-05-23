namespace Oem.Data.Table.BaseInfo
{
    public class CompanyRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 公司名称
        /// </summary>
        public string CompanyName { get; set; }
        
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