namespace WebApi.Dtos.Led
{
    public enum LedEffectPropertyKind
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
        public LedEffectPropertyKind EffectType { get; set; }
        public string Value { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
    }
}