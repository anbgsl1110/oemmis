using System;

namespace Oem.Data.Table.Auxiliary
{
    public class ScanCodeRepo
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }
        
        /// <summary>
        /// 派工Id
        /// </summary>
        public long ScanCodeId { get; set; }
        
        /// <summary>
        /// 扫码时间
        /// </summary>
        public DateTime CreateTime { get; set; }
        
        /// <summary>
        /// 扫码人Id
        /// </summary>
        public long DispatchId { get; set; }
    }
}