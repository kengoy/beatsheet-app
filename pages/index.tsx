import { InferGetStaticPropsType, GetStaticPropsResult } from 'next';
import BeatSheetMain, {
  BeatSheetMainProps,
} from '@/components/beatSheet/BeatSheetMain';
import { ActBeatsMapData } from '@/components/beatSheet/beatSheetData';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// BeatSheet is the main component for the Beat Sheet page.
export default function BeatSheet(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <QueryClientProvider client={queryClient}>
      <BeatSheetMain acts={props.acts} actBeatsMap={props.actBeatsMap} />
    </QueryClientProvider>
  );
}

// getStaticProps is a Next.js function that runs at build time to prefetch data.
export async function getStaticProps(): Promise<
  GetStaticPropsResult<BeatSheetMainProps>
> {
  const acts = await fetch('http://localhost:8080/acts/').then((res) =>
    res.json()
  );
  const actBeatsMap: ActBeatsMapData = {};
  for (const act of acts) {
    actBeatsMap[act.id] = await fetch(
      `http://localhost:8080/acts/${act.id}/beats`
    ).then((res) => res.json());
  }

  return {
    props: {
      acts,
      actBeatsMap,
    },
  };
}
