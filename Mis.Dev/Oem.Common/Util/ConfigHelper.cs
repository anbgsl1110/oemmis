using System;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace Oem.Common.Util
{
    /// <summary>
    /// appsettings.json操作类
    /// </summary>
    public sealed class ConfigHelper
    {
        /// <summary>
        /// 得到AppSettings中的配置字符串信息
        /// </summary>
        /// <param name="key"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static string GetConfigString(string key, string defaultValue = "")
        {
            DirectoryInfo directoryInfo = Directory.GetParent(AppContext.BaseDirectory);
            string basePath = directoryInfo.Parent.Parent.FullName;
            IConfigurationRoot o = new ConfigurationBuilder()
                .AddJsonFile(basePath + "\\appsettings.json").Build();
            if (o != null) defaultValue = o.GetConnectionString(key);
            return defaultValue;
        }

    }
}