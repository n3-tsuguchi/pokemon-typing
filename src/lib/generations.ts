export interface Generation {
  id: number;
  label: string;
  region: string;
  range: [number, number];
}

export const GENERATIONS: Generation[] = [
  { id: 1, label: "第1世代", region: "カントー", range: [1, 151] },
  { id: 2, label: "第2世代", region: "ジョウト", range: [152, 251] },
  { id: 3, label: "第3世代", region: "ホウエン", range: [252, 386] },
];
