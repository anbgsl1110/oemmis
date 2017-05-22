
using Microsoft.AspNetCore.Mvc;

namespace Oem.Web.Controllers
{
    public class RepertoryController : Controller
    {
        #region 采购入库

        /// <summary>
        /// 入库流水
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryList()
        {
            return View();
        }

        /// <summary>
        /// 入库流水详情
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryListDetail()
        {
            return View();
        }

        /// <summary>
        /// 入库皮增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryLeatherAdd()
        {
            return View();
        }

        /// <summary>
        /// 入库衬里增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryChenliAdd()
        {
            return View();
        }

        /// <summary>
        /// 入库辅料增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryFuliaoAdd()
        {
            return View();
        }

        #endregion

        #region 领料出库

        /// <summary>
        /// 出库流水
        /// </summary>
        /// <returns></returns>
        public IActionResult ExportRepertoryList()
        {
            return View();
        }

        /// <summary>
        /// 出库增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ExportRepertoryAdd()
        {
            return View();
        }
        
        /// <summary>
        /// 出库明细
        /// </summary>
        /// <returns></returns>
        public IActionResult ExportRepertoryListDetail()
        {
            return View();
        }

        #endregion

        #region 碎料返库

        /// <summary>
        /// 返库流水
        /// </summary>
        /// <returns></returns>
        public IActionResult ReturnRepertoryList()
        {
            return View();
        }

        /// <summary>
        /// 返库增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ReturnRepertoryAdd()
        {
            return View();
        }
        
        /// <summary>
        /// 返库明细
        /// </summary>
        /// <returns></returns>
        public IActionResult ReturnRepertoryListDetail()
        {
            return View();
        }

        #endregion
    }
}