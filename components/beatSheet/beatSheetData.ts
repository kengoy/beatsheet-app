export type ActData = {
  id: number;
  name: string;
};

export type BeatData = {
  id?: number;
  name: string;
  time: string;
  content: string;
  cameraAngle: string;
  notes: string;
};

export type ActBeatsMapData = {
  [key: string]: BeatData[];
};
