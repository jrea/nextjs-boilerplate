export function tenantPlaceholder(): string {
  const starts = [
    "Neo",
    "Omni",
    "Vanta",
    "Nova",
    "Synth",
    "Quanta",
    "Astra",
    "Zeno",
    "Hyper",
    "Cryo",
    "Xeno",
    "Vel",
    "Strato",
    "Orbi",
    "Lux",
    "Tera",
    "Axon",
  ];
  const cores = [
    "tron",
    "gen",
    "core",
    "lyt",
    "form",
    "nex",
    "scape",
    "meta",
    "dyn",
    "logic",
    "verse",
    "lab",
    "byte",
    "line",
    "shift",
    "plex",
    "path",
  ];
  const ends = [
    "ix",
    "is",
    "ion",
    "a",
    "os",
    "or",
    "en",
    "yx",
    "ex",
    "al",
    "um",
    "on",
    "ixis",
    "iq",
  ];

  const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const name =
    random(starts) + (Math.random() > 0.5 ? random(cores) : "") + random(ends);

  return name.charAt(0).toUpperCase() + name.slice(1);
}
