
namespace Awdware.Facade.Dtos.Led
{
    public class LedConfigurationDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Ordinal { get; set; }
        public string UserId { get; set; }
        public LedEffectDto LedEffect { get; set; }
    }
}
