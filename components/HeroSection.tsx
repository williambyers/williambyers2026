import BlackButton from '@/components/BlackButton';
import GreyButton from '@/components/GreyButton';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center gap-4 mx-auto px-6 py-12">
      <p className="text-[14px] tracking-wide">Digital Design & Development. Month to month. Every stage.</p>

      <h2 className="text-[14px] font-bold leading-tight">
        Some brands settle for the launchpad.
        <br />
        We build the ones that reach orbit.
      </h2>

      <p className="text-[14px]">We handle the whole thing — brand, print, web, digital, development.</p>

      <div className="flex gap-3 mt-4">
        <BlackButton href="/contact" label="Book a call" />
        <GreyButton href="/work" label="Latest Work" />
      </div>
    </div>
  );
}
