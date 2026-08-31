type GreyButtonProps = {
  href: string;
  label: string;
};

export default function GreyButton({ href, label }: GreyButtonProps) {
  return (
    <a href={href} className="bg-gray-100 text-black rounded-full px-5 py-2 cursor-pointer inline-block stroke-gray-400 stroke-1 text-[14px]">
      {label}
    </a>
  );
}
