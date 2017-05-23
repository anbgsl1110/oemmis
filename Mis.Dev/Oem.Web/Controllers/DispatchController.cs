
using Microsoft.AspNetCore.Mvc;

namespace Oem.Web.Controllers
{
    public class DispatchController : BaseController
    {
        /// <summary>
        /// 派工列表
        /// </summary>
        /// <returns></returns>
        public IActionResult DispatchList()
        {
            return View();
        }

        /// <summary>
        /// 派工详情
        /// </summary>
        /// <returns></returns>
        public IActionResult DispatchListDetail()
        {
            return View();
        }

        /// <summary>
        /// 下料皮派工
        /// </summary>
        /// <returns></returns>
        public IActionResult LeatherDispatchAdd()
        {
            return View();
        }

        /// <summary>
        /// 下料衬里派工
        /// </summary>
        /// <returns></returns>
        public IActionResult ChenliDispatchAdd()
        {
            return View();
        }

        /// <summary>
        /// 小机器派工
        /// </summary>
        /// <returns></returns>
        public IActionResult MachineDispatchAdd()
        {
            return View();
        }

        /// <summary>
        /// 生产小组派工
        /// </summary>
        /// <returns></returns>
        public IActionResult GroupDispatchAdd()
        {
            return View();
        }

        /// <summary>
        /// 生产进度列表
        /// </summary>
        /// <returns></returns>
        public IActionResult ProduceProgressList()
        {
            return View();
        }

        /// <summary>
        /// 生产进度详情
        /// </summary>
        /// <returns></returns>
        public IActionResult ProduceProgressDetail()
        {
            return View();
        }
    }
}