using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Oem.Common.CacheHelper;
using Oem.Data.Table.Order;
using Oem.Services.Services.Order;

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
            OrderService service = new OrderService();
            var result = service.Select(new 
                OrderRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
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
        
        /// <summary>
        /// 删除定单
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DeleteOrder(long[] ids)
        {       
            foreach (var id in ids)
            {
                OrderService.Delete(new OrderRepo(), id);
            }
            return Json(@"删除成功");
        }
        
        #endregion

        #region 申购

        /// <summary>
        /// 申购
        /// </summary>
        /// <returns></returns>
        public IActionResult ApplyPurchase()
        {
            RequisitionService service = new RequisitionService();
            var result = service.Select(new 
                RequisitionRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
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

        /// <summary>
        /// 删除申购
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DeleteApplyPurchase(long[] ids)
        {       
            foreach (var id in ids)
            {
                RequisitionService.Delete(new RequisitionRepo(), id);
            }
            return Json(@"删除成功");
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
            PurchaseService service = new PurchaseService();
            var result = service.Select(new 
                PurchaseRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
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
            PurchaseService service = new PurchaseService();
            var result = service.Select(new 
                PurchaseRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
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
        
        /// <summary>
        /// 删除采购
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DeletePurchaseC(long[] ids)
        {       
            foreach (var id in ids)
            {
                RequisitionService.Delete(new RequisitionRepo(), id);
            }
            return Json(@"删除成功");
        }

        #endregion

        public OrderController(ICacheService cacheService) : base(cacheService)
        {
        }
    }
}