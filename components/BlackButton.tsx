type BlackButtonProps = {
  href: string;
  label: string;
};

export default function BlackButton({ href, label }: BlackButtonProps) {
  return (
    <a href={href} className="bg-black text-white rounded-full px-5 py-2 cursor-pointer inline-block text-[14px]">
      {label}
    </a>
  );
}
