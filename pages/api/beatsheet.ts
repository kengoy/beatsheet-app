import { ActData, BeatData } from '@/components/beatSheet/beatSheetData';
import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8080';

export const addActs = async (act: ActData) => {
  return await axios
    .post(`${SERVER_URL}/acts`, { name: act.name })
    .then((res) => res.data.json);
};

export const getActs = async () => {
  return await fetch(`${SERVER_URL}/acts`).then((res) => res.json());
};

export const getBeats = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null | undefined]>) => {
  const [_, actId] = queryKey;
  return await fetch(`${SERVER_URL}/acts/${actId}/beats`).then((res) =>
    res.json()
  );
};

export const putBeat = async (beat: BeatData) => {
  return await axios
    .put(`${SERVER_URL}/acts/beats/${beat.id}`, beat)
    .then((res) => res.data.json);
};

export const addBeat = async (id: number, beat: BeatData) => {
  return await axios
    .post(`${SERVER_URL}/acts/${id}/beats/`, beat)
    .then((res) => res.data.json);
};

export const deleteBeat = async (actId: number, beatId: number) => {
  return await axios
    .delete(`${SERVER_URL}/acts/${actId}/beats/${beatId}`)
    .then((res) => res.data.json);
};

export const deleteActs = async (actId: number) => {
  return await axios
    .delete(`${SERVER_URL}/acts/${actId}`)
    .then((res) => res.data.json);
};
