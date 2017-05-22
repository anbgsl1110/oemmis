
using Microsoft.AspNetCore.Mvc;

namespace Oem.Web.Controllers
{
    public class AuxiliaryController : Controller
    {
        /// <summary>
        /// 扫码流水
        /// </summary>
        /// <returns></returns>
        public IActionResult ScanList()
        {
            return View();
        }

        /// <summary>
        /// 扫码添加
        /// </summary>
        /// <returns></returns>
        public IActionResult ScanAdd()
        {
            return View();
        }
    }
}