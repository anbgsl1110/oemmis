
using Microsoft.AspNetCore.Mvc;

namespace Oem.Web.Controllers
{
    public class BaseInfoController : BaseController
    {
        #region 原材料

        /// <summary>
        /// 原材料信息列表
        /// </summary>
        /// <returns></returns>
        public IActionResult SeriesInfoList()
        {
            return View();
        }

        /// <summary>
        /// 原材料信息添加
        /// </summary>
        /// <returns></returns>
        public IActionResult SersiesInfoAdd()
        {
            return View();
        }

        #endregion

        #region 产品

        /// <summary>
        /// 产品信息列表
        /// </summary>
        /// <returns></returns>
        public IActionResult ProductInfoList()
        {
            return View();
        }

        /// <summary>
        /// 产品信息添加
        /// </summary>
        /// <returns></returns>
        public IActionResult ProductInfoAdd()
        {
            return View();
        }
        
        #endregion

        #region 供应商

        /// <summary>
        /// 供应商信息列表
        /// </summary>
        /// <returns></returns>
        public IActionResult SupplerInfoList()
        {
            return View();
        }

        #endregion

        #region 公司

        /// <summary>
        /// 公司信息列表
        /// </summary>
        /// <returns></returns>
        public IActionResult CompanyInfoList()
        {
            return View();
        }

        #endregion

        #region 仓库

        /// <summary>
        /// 仓库信息列表
        /// </summary>
        /// <returns></returns>
        public IActionResult WarehouseInfoList()
        {
            return View();
        }

        #endregion

    }
}