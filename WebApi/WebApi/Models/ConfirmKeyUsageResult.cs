using WebApi.Entities;

namespace WebApi.Models
{
    public class ConfirmKeyUsageResult
    {
        public ConfirmKeyUsageSuccess Success { get; set; }
        public WebUser WebUser { get; set; }
    }
}
