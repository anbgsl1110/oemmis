using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Oem.Common.CacheHelper;
using Oem.Data.Table.BaseInfo;
using Oem.Services.Services.BaseInfo;

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
            OriginalMaterialsService service = new OriginalMaterialsService();
            var result = service.Select(new 
                OriginalMaterialsRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
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
        
        /// <summary>
        /// 添加原材料信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AddOriginalMaterials(OriginalMaterialsRepo originalMaterialsRepo)
        {     
            OriginalMaterialsService service = new OriginalMaterialsService();
            var result = service.Insert(originalMaterialsRepo);

            return Json(result);
        }
        
        /// <summary>
        /// 删除原材料
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DeleteOriginalMaterials(long[] ids)
        {       
            foreach (var id in ids)
            {
                OriginalMaterialsService.Delete(new OriginalMaterialsRepo(), id);
            }
            return Json(@"删除成功");
        }

        #endregion

        #region 产品

        /// <summary>
        /// 产品信息列表
        /// </summary>
        /// <returns></returns>
        public IActionResult ProductInfoList()
        {
            ProductService service = new ProductService();
            var result = service.Select(new 
                ProductRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
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
        
        /// <summary>
        /// 添加产品
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AddProductInfo(ProductRepo productRepo)
        {       
            ProductService service = new ProductService();
            var result = service.Insert(productRepo);

            return Json(result);
        }
        
        /// <summary>
        /// 删除产品
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DeleteProductInfo(long[] ids)
        {       
            ProductService service = new ProductService();
            foreach (var id in ids)
            {
                service.Delete(new ProductRepo(), id);
            }
            return Json(@"删除成功");
        }
        
        #endregion

        #region 供应商

        /// <summary>
        /// 供应商信息列表
        /// </summary>
        /// <returns></returns>
        public IActionResult SupplerInfoList()
        {
            SupplerService service = new SupplerService();
            var result = service.Select(new 
                SupplerRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
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
            CompanyService service = new CompanyService();
            var result = service.Select(new 
                CompanyRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
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
            WarehouseService service = new WarehouseService();
            var result = service.Select(new 
                WarehouseRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
            return View();
        }

        #endregion

        public BaseInfoController(ICacheService cacheService) : base(cacheService)
        {
        }
    }
}