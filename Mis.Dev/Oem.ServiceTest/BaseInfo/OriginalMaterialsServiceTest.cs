using System.Collections.Generic;
using Oem.Data.Table.BaseInfo;
using Oem.Services.Services.BaseInfo;
using Xunit;

namespace Oem.ServiceTest.BaseInfo
{
    /// <summary>
    /// 原材料服务单元测试
    /// </summary>
    public class OriginalMaterialsServiceTest
    {
        private readonly OriginalMaterialsService _service;

        public OriginalMaterialsServiceTest()
        {
            _service = new OriginalMaterialsService();
        }

        /// <summary>
        /// 查询数据测试
        /// </summary>
        /// <returns></returns>
        [Fact]
        public void SelectTest()
        {
            var origianlMaterials = _service.Select(new OriginalMaterialsRepo(), 4);
            var origianlMaterialses = _service.Select(new OriginalMaterialsRepo(), 0, 1000);
            IDictionary<string, object> parameters = new Dictionary<string, object>
            {
                {@"PageIndex", 1},
                {@"PageSize", 100}
            };

            var result= _service.Select<OriginalMaterialsRepo>(parameters);
            Assert.NotNull(result);
        }

        /// <summary>
        /// 根据Id删除用户
        /// </summary>
        [Fact]
        public void DeleteTest()
        {
            var result = _service.Delete(new OriginalMaterialsRepo(), 3);
        }

        /// <summary>
        /// 插入用户数据
        /// </summary>
        [Fact]
        public void InsertTest()
        {
            var origianlMaterials = new OriginalMaterialsRepo
            {
                Name = "serviceUnit原材料",
                Type = "serviceUnit皮000",
                Color = "绿色",
                Format = "20*18",
                Unit = "平方米",
                WarehouseName = "仓库0001",
                WarehouseNumber  = "CK0001",
                Sort = "皮",
                SerialNumber = "G920",
                SupplerId = 1,
                WarehousesAmount = 1110,
                ShreddedWarehousesAmount = 1110,
                StockWarehouseAmount = 1110 
            };
            var result = _service.Insert(origianlMaterials);
        }
        
        /// <summary>
        /// 插入用户数据
        /// </summary>
        [Fact]
        public void InsertWithIdetityTest()
        {
            var origianlMaterials = new OriginalMaterialsRepo
            {
                Name = "serviceUnit原材料",
                Type = "serviceUnit皮000",
                Color = "绿色",
                Format = "20*18",
                Unit = "平方米",
                WarehouseName = "仓库0001",
                WarehouseNumber  = "CK0001",
                Sort = "衬里",
                SerialNumber = "G920",
                SupplerId = 1,
                WarehousesAmount = 1110,
                ShreddedWarehousesAmount = 1110,
                StockWarehouseAmount = 1110 
            };
            var result = _service.InsertWithIdentity(origianlMaterials);
        }

        /// <summary>
        /// 更新数据测试
        /// </summary>
        [Fact]
        public void UpdateTest()
        {
            var origianlMaterials = new OriginalMaterialsRepo
            {
                Id = 5,
                Name = "serviceUnit原材料",
                Type = "serviceUnit皮000",
                Color = "绿色",
                Format = "20*18",
                Unit = "平方米",
                WarehouseName = "仓库0001",
                WarehouseNumber  = "CK0001",
                Sort = "皮",
                SerialNumber = "G920",
                SupplerId = 1,
                WarehousesAmount = 1110,
                ShreddedWarehousesAmount = 1110,
                StockWarehouseAmount = 1110 
            };
            var result = _service.Update(origianlMaterials);
        }
    }
}