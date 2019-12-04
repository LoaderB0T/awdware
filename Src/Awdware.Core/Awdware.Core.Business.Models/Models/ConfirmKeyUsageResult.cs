using Awdware.Core.Data.Facade.Entities;

namespace Awdware.Core.Business.Utils.Models
{
    public class ConfirmKeyUsageResult
    {
        public ConfirmKeyUsageSuccess Success { get; set; }
        public WebUser WebUser { get; set; }
    }
}
