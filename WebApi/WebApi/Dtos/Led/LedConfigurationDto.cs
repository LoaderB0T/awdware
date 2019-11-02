
namespace WebApi.Dtos.Led
{
    public class LedConfigurationDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public LedEffectDto LedEffect { get; set; }
    }
}
