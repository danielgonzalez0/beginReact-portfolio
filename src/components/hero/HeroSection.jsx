import { FULL_NAME } from "../../lib/config";

export const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row relative items-start w-full max-w-5xl m-auto">
      <img
        width={300}
        height={300}
        src="/images/daniel.jpg"
        alt="avatar"
        className="rounded-full shadow-2xl dark:shadow-amber-500 md:absolute top-[-16px] md:right-[-32px] lg:right-[-42px]"
      />
      {/* Hero - Exercise*/}
      <div className="flex flex-col gap-4 md:relative md:mr-8">
        {/* Hero - Exercise*/}
        <h1 className="text-6xl drop-shadow-[0_0px_20px_rgba(0,0,0,0.25)] md:text-7xl">
          I'm{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            {FULL_NAME}
          </span>
        </h1>
        <p className="max-w-xl text-xl z-10">
          <b>Apprenti React.</b> I’m a software developer that make thing on
          internet, very happy to see your here, place holder please fill
          something here please fill something here.
        </p>
      </div>
    </div>
  );
};
