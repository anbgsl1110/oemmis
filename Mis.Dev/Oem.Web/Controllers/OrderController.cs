using Microsoft.AspNetCore.Mvc;

namespace Oem.Web.Controllers
{
    public class OrderController : BaseController
    {
        #region 订单

        /// <summary>
        /// 定单 
        /// </summary>
        /// <returns></returns>
        public IActionResult Order()
        {
            return View();
        }

        /// <summary>
        /// 定单添加
        /// </summary>
        /// <returns></returns>
        public IActionResult OrderAdd()
        {
            return View();
        }
        
        #endregion

        #region 申购

        /// <summary>
        /// 申购
        /// </summary>
        /// <returns></returns>
        public IActionResult ApplyPurchase()
        {
            return View();
        }

        /// <summary>
        /// 申购添加
        /// </summary>
        /// <returns></returns>
        public IActionResult ApplyPurchaseAdd()
        {
            return View();
        }

        #endregion

        #region 采购

        /// <summary>
        /// 采购录入
        /// </summary>
        /// <returns></returns>
        public IActionResult PurchaseAdd()
        {
            return View();
        }

        /// <summary>
        /// 采购皮
        /// </summary>
        /// <returns></returns>
        public IActionResult PurchaseLeather()
        {
            return View();
        }

        /// <summary>
        /// 采购皮修改
        /// </summary>
        /// <returns></returns>
        public IActionResult PurchaseLeatherAdd()
        {
            return View();
        }

        /// <summary>
        /// 采购衬里
        /// </summary>
        /// <returns></returns>
        public IActionResult PurchaseChenli()
        {
            return View();
        }

        /// <summary>
        /// 采购衬里修改
        /// </summary>
        /// <returns></returns>
        public IActionResult PurchaseChenliAdd()
        {
            return View();
        }

        #endregion
    }
}