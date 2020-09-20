/// <reference types="next" />
/// <reference types="next/types/global" />
type RawNormalizedSettingsItem = Record<string, number | Record<string, number>>;
type NormalizedSettingsItem = { name: string; value: number };
