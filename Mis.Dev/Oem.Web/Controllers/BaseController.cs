
using Microsoft.AspNetCore.Mvc;

namespace Oem.Web.Controllers
{
    public class BaseController : Controller
    {
        /// <summary>
        /// 错误界面
        /// </summary>
        /// <returns></returns>
        public IActionResult Error()
        {
            return View();
        }
    }
}