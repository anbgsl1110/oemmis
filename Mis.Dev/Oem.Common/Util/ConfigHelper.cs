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
        public static string GetConnectionString(string key, string defaultValue = "")
        {
            DirectoryInfo directoryInfo = Directory.GetParent(AppContext.BaseDirectory);
            string basePath = directoryInfo.Parent.Parent.FullName;
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .AddJsonFile(basePath + "\\appsettings.json").Build();
            if (configuration != null) defaultValue = configuration.GetConnectionString(key);
            return defaultValue;
        }

        public static IConfiguration GetConfigString(string key)
        {
            DirectoryInfo directoryInfo = Directory.GetParent(AppContext.BaseDirectory);
            string basePath = directoryInfo.Parent.Parent.FullName;
            IConfigurationSection configurationSection = new ConfigurationBuilder()
                .AddJsonFile(basePath + "\\appsettings.json").Build().GetSection(key);
            return configurationSection;
        }

    }
}