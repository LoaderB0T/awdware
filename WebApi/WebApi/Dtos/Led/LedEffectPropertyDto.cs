namespace WebApi.Dtos.Led
{
    public enum LedEffectPropertyKind
    {
        Unknown = 0,
        Color = 1,
        Number = 2,
        Bool = 3
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