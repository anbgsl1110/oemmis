
namespace Oem.Web.Helpers
{
    /// <summary>
    /// 默认配置项，一般是从config读取
    /// </summary>
    public class MvcSettings
    {
        ///// <summary>
        ///// 
        ///// </summary>
        //public static string ResourceDoMain
        //{
        //    get
        //    {
        //        return ConfigHelper.GetConfigString("ResourceDoMain", string.Empty);
        //    }
        //}
        ///// <summary>
        ///// 版本
        ///// </summary>
        //public static string Version
        //{
        //    get
        //    {
        //        return ConfigHelper.GetConfigString("Version");
        //    }
        //}
    }
    /// <summary>
    /// 
    /// </summary>
    public static class MvcHelpers
    {
        /// <summary>
        /// 页面输出脚本样式语句
        /// </summary>
        /// <param name="html"></param>
        /// <param name="formatStr">字符串format语句</param>
        /// <param name="link">脚本样式连接</param>
        /// <returns></returns>
        private static IHtmlString Render(this System.Web.Mvc.HtmlHelper html, string formatStr, string link)
        {
            //var ticks = DateTime.Now.ToString("yyyyMMddHH");
            //文件引用后缀改为版本号形式
            var ticks = "version=" + MvcSettings.Version;
            //资源文件站点路径不带"/" 例:http://localhost:9999
            string doMain = MvcSettings.ResourceDoMain;
            return html.Raw(string.Format(formatStr, doMain, link, ticks));
        }

        /// <summary>
        /// 输出脚本
        /// </summary>
        /// <param name="html"></param>
        /// <param name="link"></param>
        /// <returns></returns>
        public static IHtmlString RenderSciprt(this System.Web.Mvc.HtmlHelper html, string link)
        {
            string formatStr = "<script src=\"{0}{1}?{2}\" type=\"text/javascript\"></script>";
            return Render(html, formatStr, link);
        }
        /// <summary>
        /// 输入requirejs脚本 附加data-main属性
        /// 增加requirejs 全局配置
        /// </summary>
        /// <param name="html"></param>
        /// <param name="link"></param>
        /// <param name="main"></param>
        /// <returns></returns>
        public static IHtmlString RenderRequireScript(this System.Web.Mvc.HtmlHelper html, string link, string main)
        {
            string formatStr = "<script src=\"{0}{1}?{2}\" type=\"text/javascript\" data-main=\"{3}.js\"></script>";
            //文件引用后缀改为版本号形式
            var ticks = "version=" + MvcSettings.Version;
            //资源文件站点路径不带"/" 例:http://localhost:9999
            string doMain = MvcSettings.ResourceDoMain;
            //requireJs baseURL
            string baseUrl = "/Scripts/app";
            if (doMain != string.Empty)
            {
                baseUrl = doMain + baseUrl;
            }

            string requireJsGlobalConfig = @"<script>var require = {urlArgs:'" + ticks + @"',baseUrl:'" + baseUrl
                                           + @"'};</script>";
            return html.Raw(requireJsGlobalConfig + string.Format(formatStr, doMain, link, ticks, doMain + main));
        }

        /// <summary>
        /// 输出样式表
        /// </summary>
        /// <param name="html"></param>
        /// <param name="link"></param>
        /// <returns></returns>
        public static IHtmlString RenderCss(this System.Web.Mvc.HtmlHelper html, string link)
        {
            string formatStr = "<link href=\"{0}{1}?{2}\" rel=\"stylesheet\" type=\"text/css\" />";
            return Render(html, formatStr, link);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="html"></param>
        /// <param name="link"></param>
        /// <returns></returns>
        public static IHtmlString RenderUrl(this System.Web.Mvc.HtmlHelper html, string link)
        {
            string formatStr = "{0}{1}?{2}>";
            return Render(html, formatStr, link);
        }
    }
}