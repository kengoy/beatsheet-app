import { Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const SideBar = ({ showText, setShowText, openSidBar, setOpenSidBar }: any) => {
  const [enabled, setEnabled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [show, setShow] = useState(true);
  const [sideBarShow, setSideBarShow] = useState(false);

  // responsive check
  const responsive = useMediaQuery({
    query: '(max-width: 1200px)',
  });

  // get router path
  const { route } = useRouter();

  const onMouseOverHandler = () => {
    if (sideBarShow) {
      setShowText(true);
    }
  };

  const onMouseLeaveHandler = () => {
    if (sideBarShow) {
      setShow(true);
      setShowText(false);
    }
  };

  const onClickHandler = () => {
    setShow(true);
    setSideBarShow(!sideBarShow);
    setShowText(!showText);
  };

  const handleClick = () => {
    setTheme(theme === 'dark' || theme === 'system' ? 'light' : 'dark');
  };

  useEffect(() => setEnabled(true), []);

  if (!enabled) return null;

  return (
    <>
      {responsive && openSidBar ? (
        <div className="w-full bg-gray-950 bg-opacity-70 h-[100vh] fixed top-0 left-0 z-30"></div>
      ) : (
        ''
      )}

      <motion.section
        className={`fixed left-0 top-0 z-30 container overflow-y-scroll lg:overflow-auto ${
          showText ? 'w-[212px] 2xl:w-[312px]' : 'w-auto'
        } border dark:border-[var(--color-dark)] bg-white dark:bg-[var(--color-gray-7)] px-6 pt-6 pb-10 ${
          openSidBar ? 'block' : 'hidden lg:block'
        }`}
        animate={{
          width: showText ? (responsive ? 212 : 312) : 150,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-[calc(100vh-65px)] flex flex-col justify-between">
          <div className="clss">
            <div className="flex items-center gap-10">
              <Link href="/">
                <svg
                  id="spotterla_spotterlogo"
                  className="transition-all duration-300 w-[100px] lg:w-[124px] lg:h-[30px] text-neutral-900 dark:text-white"
                  viewBox="0 0 125 30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M64.099 5.86025L61.9478 4.05147L55.7693 11.4331V1.79752H52.9609V11.4331L46.7825 4.05147L44.6313 5.86025L50.8097 13.2419L41.3511 11.5515L40.8624 14.3238L50.3211 16.0143L41.9858 20.8321L43.39 23.272L51.7084 18.4542L48.4226 27.5094L51.0625 28.473L54.3483 19.4177L57.6341 28.473L60.2683 27.5094L56.9882 18.4542L65.301 23.272L66.7052 20.8321L58.3924 16.0143L67.851 14.3238L67.3623 11.5515L57.9037 13.2419L64.099 5.86025ZM12.1215 21.2603C11.1725 21.7788 10.1006 22.0282 9.021 21.9816C7.77941 22.0385 6.55308 21.6884 5.52738 20.9842C5.10545 20.6961 4.75427 20.3157 4.50032 19.8715C4.24637 19.4274 4.09629 18.9312 4.0614 18.4204H0.000483561C-0.0119114 19.4057 0.21415 20.3793 0.659272 21.2577C1.10439 22.1361 1.75529 22.893 2.55611 23.4636C4.20744 24.6732 6.37551 25.2799 9.06032 25.2836C10.5259 25.3051 11.9821 25.047 13.3515 24.5229C14.5355 24.0815 15.5753 23.3211 16.3565 22.3253C17.0843 21.3789 17.4704 20.2128 17.4518 19.0176C17.5169 17.8103 17.1415 16.6205 16.3958 15.6705C15.6469 14.817 14.6737 14.1921 13.5874 13.8674C12.174 13.4413 10.7212 13.16 9.25129 13.0278C7.97629 12.87 7.05513 12.7291 6.48222 12.6165C5.96315 12.5238 5.47388 12.3073 5.05557 11.9854C4.8628 11.8199 4.71153 11.6113 4.61396 11.3764C4.51639 11.1414 4.47526 10.8868 4.49389 10.633C4.49029 10.2414 4.59292 9.8563 4.79081 9.51881C4.9887 9.18132 5.27438 8.9042 5.61725 8.71713C6.52134 8.21041 7.54831 7.9665 8.5829 8.01277C9.66533 7.97099 10.7325 8.27914 11.6272 8.89181C12.0043 9.14592 12.3221 9.47898 12.5587 9.86807C12.7953 10.2572 12.945 10.6931 12.9977 11.1458H17.0923C17.0671 10.21 16.8226 9.29343 16.3786 8.47013C15.9346 7.64684 15.3036 6.93999 14.5367 6.40683C12.964 5.27986 10.9138 4.71638 8.38631 4.71638C6.97497 4.69203 5.57369 4.95861 4.26923 5.49962C3.13627 5.96312 2.15142 6.72898 1.42152 7.71413C0.732524 8.6621 0.369763 9.80927 0.388042 10.9823C0.329733 12.1145 0.698734 13.227 1.42152 14.0984C2.16123 14.9005 3.10503 15.485 4.15127 15.7889C5.56206 16.1942 7.00544 16.4751 8.46495 16.6285C9.73995 16.7862 10.6836 16.9384 11.2733 17.0793C11.8178 17.1861 12.324 17.4371 12.7393 17.8062C12.9358 18.0059 13.0876 18.2455 13.1845 18.5088C13.2814 18.7722 13.3211 19.0532 13.301 19.3332C13.2981 19.7318 13.1868 20.122 12.9789 20.4616C12.771 20.8013 12.4745 21.0775 12.1215 21.2603ZM19.339 4.98686H23.0067L23.5179 7.96206C24.2597 6.93344 25.2415 6.10284 26.3773 5.54292C27.5131 4.983 28.7684 4.71082 30.0333 4.75018C31.7406 4.71972 33.4253 5.14564 34.9143 5.98422C36.3596 6.81639 37.531 8.05422 38.2843 9.54545C39.1256 11.2414 39.542 13.1175 39.4976 15.0113C39.536 16.8792 39.1195 18.7283 38.2843 20.3982C37.5274 21.8971 36.3578 23.1467 34.9143 23.9989C33.4339 24.863 31.7457 25.3034 30.0333 25.2723C28.6989 25.3035 27.3757 25.0218 26.169 24.4497C25.1207 23.9346 24.2215 23.1586 23.5572 22.1957V30H19.339V4.98686ZM23.5179 14.9324C23.4385 16.7058 24.0078 18.4472 25.1186 19.8291C25.6332 20.442 26.2796 20.9299 27.0093 21.2559C27.739 21.5819 28.5329 21.7375 29.3312 21.7111C30.1328 21.7373 30.9299 21.5816 31.6632 21.2557C32.3964 20.9299 33.0469 20.4422 33.5663 19.8291C34.6822 18.4796 35.2605 16.7633 35.1895 15.0113C35.2698 13.2579 34.6904 11.5384 33.5663 10.1935C33.0249 9.6177 32.372 9.15898 31.6476 8.84546C30.9232 8.53193 30.1426 8.3702 29.3537 8.3702C28.5647 8.3702 27.7841 8.53193 27.0597 8.84546C26.3354 9.15898 25.6824 9.6177 25.1411 10.1935C24.0294 11.5145 23.4504 13.2048 23.5179 14.9324ZM74.6866 0H70.4291V19.5924C70.4291 21.4463 70.8672 22.8212 71.7378 23.7059C72.6084 24.5905 73.9845 25.0357 75.8998 25.0357H79.4889V21.3167H76.7592C76.4732 21.3467 76.1841 21.3188 75.9092 21.2346C75.6342 21.1504 75.3789 21.0116 75.1584 20.8264C74.7968 20.3524 74.6282 19.7582 74.6866 19.1642V8.70586H79.4889V4.98686H74.6866V0ZM90.6663 8.70586V4.98686H85.8246V0H81.6064V19.5924C81.6064 21.4463 82.0333 22.8212 82.8927 23.7059C83.752 24.5905 85.1394 25.0357 87.0322 25.0357H91.0931V21.3167H87.8916C87.6057 21.3455 87.3169 21.3169 87.0421 21.2328C86.7673 21.1486 86.5119 21.0105 86.2908 20.8264C85.9313 20.3515 85.7646 19.7575 85.8246 19.1642V8.70586H90.6663ZM109.949 9.26934C110.823 10.8141 111.273 12.5643 111.252 14.3407C111.252 14.878 111.215 15.4147 111.139 15.9467H96.0696V16.1382C96.0842 17.677 96.6688 19.1552 97.7097 20.2855C98.2241 20.799 98.8392 21.1999 99.5159 21.4627C100.193 21.7256 100.916 21.8447 101.641 21.8125C102.801 21.8531 103.945 21.5323 104.916 20.8941C105.805 20.2766 106.432 19.3481 106.674 18.2908H110.892C110.56 20.2703 109.51 22.0566 107.943 23.3058C106.237 24.6437 104.115 25.336 101.95 25.2611C100.056 25.307 98.1811 24.8688 96.5021 23.9876C94.9838 23.1686 93.7365 21.9232 92.913 20.4038C92.0392 18.7542 91.6021 16.9071 91.6436 15.0394C91.6021 13.1566 92.0246 11.2927 92.8737 9.61307C93.6504 8.10612 94.8439 6.85592 96.3111 6.01239C97.8532 5.14419 99.5982 4.70458 101.366 4.73892C103.135 4.70111 104.885 5.10381 106.461 5.91097C107.914 6.6733 109.123 7.8315 109.949 9.25244V9.26934ZM106.96 12.8362C106.852 11.51 106.229 10.2796 105.225 9.41022C104.184 8.56522 102.873 8.12687 101.535 8.17618C100.229 8.14821 98.9579 8.60127 97.9624 9.44966C97.464 9.86946 97.0538 10.3846 96.7558 10.9651C96.4578 11.5455 96.278 12.1797 96.2269 12.8306L106.96 12.8362ZM117.576 14.9887C117.516 13.4596 117.926 11.9489 118.75 10.6612C119.531 9.53418 120.795 8.9707 122.536 8.9707H124.412V5.02629H123.474C122.202 4.96464 120.937 5.24065 119.806 5.82644C118.883 6.36214 118.11 7.12406 117.559 8.04095L117.093 5.02629H113.347V25.0751H117.559L117.576 14.9887Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
              <button type={'button'} onClick={onClickHandler}>
                <span className="material-symbols-outlined">menu_open</span>
              </button>
            </div>
            <div className="mt-[60px]">
              <ul>
                <li
                  className="pb-3"
                  onMouseOver={onMouseOverHandler}
                  onMouseLeave={onMouseLeaveHandler}
                >
                  <Link
                    href="/"
                    className={`flex items-center gap-2 p-3 ${
                      showText ? '' : 'justify-center'
                    } ${route === '/' ? 'side-bar-active' : ''}`}
                    onClick={() => setOpenSidBar(false)}
                  >
                    <span className="material-symbols-outlined">dns</span>
                    <span
                      className={`text-[var(--color-gray-4)] font-semibold text-[16px] leading-[130%]`}
                    >
                      {showText ? 'Beat Sheet' : ''}
                    </span>
                  </Link>
                </li>
                <li
                  className="pb-3"
                  onMouseOver={onMouseOverHandler}
                  onMouseLeave={onMouseLeaveHandler}
                >
                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 p-3 ${
                      showText ? '' : 'justify-center'
                    } ${route === '/profile' ? 'side-bar-active' : ''}`}
                    onClick={() => setOpenSidBar(false)}
                  >
                    <span className="material-symbols-outlined">group</span>
                    <span
                      className={`text-[var(--color-gray-4)] font-semibold text-[16px] leading-[130%]`}
                    >
                      {showText ? 'Profile' : ''}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 mt-10">
            <span className="material-symbols-outlined dark:text-white">
              light_mode
            </span>

            <Switch
              checked={enabled}
              onChange={handleClick}
              className={`${
                theme === 'light' ? 'border-[#1C1B1F]' : 'border-[#fff]'
              } relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-[#1C1B1F] transition-colors duration-200 ease-in-out`}
            >
              <span className="sr-only">Use Setting</span>
              <span
                aria-hidden="true"
                className={`${
                  theme !== 'light'
                    ? 'translate-x-[20px] bg-[#fff]'
                    : 'translate-x-0 bg-[#1C1B1F]'
                } pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full  shadow-lg ring-0 transition duration-200 ease-in-out`}
              ></span>
            </Switch>
            <span className="material-symbols-outlined dark:text-white">
              dark_mode
            </span>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default SideBar;
