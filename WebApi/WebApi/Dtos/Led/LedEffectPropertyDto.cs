namespace WebApi.Dtos.Led
{
    public enum LedEffectPropertyType
    {
        UNKNOWN = 0,
        COLOR = 1,
        NUMBER = 2,
        BOOL = 3
    }

    public class LedEffectPropertyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public LedEffectPropertyType EffectType { get; set; }
        public object Value { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
    }
}