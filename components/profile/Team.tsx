import teamData from '@/data/team';
import MemberCard from './MemberCard';

const Team = () => {
  return (
    <div className="flex items-center justify-center min-[600px]:justify-start flex-wrap gap-3 md:gap-6 mt-5">
      {teamData.slice(0, 6).map((itm) => (
        <MemberCard key={itm.id} data={itm} />
      ))}
    </div>
  );
};

export default Team;
