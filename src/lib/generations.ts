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
  { id: 4, label: "第4世代", region: "シンオウ", range: [387, 493] },
  { id: 5, label: "第5世代", region: "イッシュ", range: [494, 649] },
  { id: 6, label: "第6世代", region: "カロス", range: [650, 721] },
  { id: 7, label: "第7世代", region: "アローラ", range: [722, 809] },
  { id: 8, label: "第8世代", region: "ガラル", range: [810, 905] },
  { id: 9, label: "第9世代", region: "パルデア", range: [906, 1025] },
];
