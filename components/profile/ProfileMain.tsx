import Image from 'next/image';
import { useRouter } from 'next/router';
import ProfileCard from './ProfileCard';
import Team from './Team';
import banner from '/public/images/profile/team_banner.webp';
import Button from '../common/Button';

const ProfileMain = () => {
  const router = useRouter();

  const { view } = router.query;

  return (
    <div className="w-full">
      <div className="w-full relative">
        <Image src={banner} alt="banner" className="w-full h-96 object-cover" />

        <div className="flex flex-row sm:flex-col lg:flex-row items-center gap-2 lg:gap-5 absolute right-5 xl:right-[160px] bottom-[45%] sm:bottom-5 lg:bottom-[60px]">
          <Button>Edit cover photo</Button>
          <Button>Edit Profile</Button>
        </div>
      </div>

      <div className="flex flex-col min-[600px]:flex-row">
        <ProfileCard />
        <div className="w-full min-[600px]:w-6/12 lg:w-7/12 2xl:w-9/12 pl-2 md:pl-0 pr-2 md:pr-3 min-[1235px]:px-0">
          <div className="overflow-x-auto">
            <Team />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
