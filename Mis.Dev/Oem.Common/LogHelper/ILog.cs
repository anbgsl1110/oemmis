using System;

namespace Oem.Common.LogHelper
{
    public interface ILog
    {
        /// <summary>
        /// 写日志
        /// </summary>
        /// <param name="exception"></param>
        /// <param name="addition"></param>
        void WriteLog(Exception exception,string addition = "");
    }
}