const experience = [
  {
    role: 'Senior Designer',
    company: 'Overclockers UK',
    meta: 'Hybrid, UK',
    date: 'April 2026 – Present',
    color: 'bg-neutral-700',
  },
  {
    role: 'Graphic & Digital Designer',
    company: 'Overclockers UK',
    meta: 'Hybrid, UK',
    date: 'September 2023 – April 2026',
    color: 'bg-neutral-700',
  },
  {
    role: 'Freelance Designer',
    company: 'VinciWorks, Sun King, and more.',
    meta: 'Remote, UK',
    date: 'September 2022 – Present',
    color: 'bg-red-600',
  },
  {
    role: 'Graphics Communications',
    company: 'Nottingham Trent University',
    meta: 'MA Degree',
    date: 'September 2022 – June 2023',
    color: 'bg-pink-700',
  },
  {
    role: 'Graphic Design',
    company: 'University Of Derby',
    meta: 'BA Degree',
    date: 'September 2019 – April 2022',
    color: 'bg-neutral-300',
  },
];

const sideProjects = [
  {
    role: 'YouTube Channel',
    company: 'Design Channel',
    meta: '',
    date: 'April 2026 – Present',
    color: 'bg-red-600',
    link: { label: 'Watch YouTube Channel ↗', href: 'https://youtube.com' },
  },
];

function Entry({
  role, company, meta, date, color, link,
}: {
  role: string; company: string; meta: string; date: string; color: string;
  link?: { label: string; href: string };
}) {
  return (
    <div className="group flex items-center gap-5 px-4 py-3 -mx-4 rounded-2xl hover:bg-white/5 transition-colors duration-200 cursor-pointer">
      <div className={`w-[60px] h-[60px] rounded-2xl shrink-0 ${color} transition-transform duration-200 group-hover:scale-105`} />

      <div>
        <p className="text-white text-[15px] leading-snug">
          {role} at <span className="font-semibold">{company}</span>
        </p>
        <p className="text-[14px] mt-0.5">
          {meta && <span className="text-neutral-600">{meta}</span>}
          {meta && <span className="text-neutral-600 mx-2">·</span>}
          <span className="text-neutral-500">{date}</span>
        </p>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
className="inline-block mt-1 text-[13px] text-[#f5c800] hover:text-yellow-300 transition-colors"
          >
            {link.label}
          </a>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-white text-[15px] font-medium mb-8">{title}</h2>
      <div className="flex flex-col gap-7">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-8 pt-36 pb-24">
      <div className="w-full max-w-lg flex flex-col gap-16">

        <div>
          <h2 className="text-white text-[15px] font-medium mb-6">About</h2>
          <p className="text-neutral-400 text-[14px] leading-relaxed mb-4">
            I&apos;m a graphic and digital designer based in England, specialising in brand identity, CGI product renders, and campaign creative. I care about work that feels considered — where the concept and the craft are both taken seriously.
          </p>
          <p className="text-neutral-400 text-[14px] leading-relaxed">
            Currently Senior Designer at Overclockers UK, and available for freelance projects on the side. If you&apos;ve got something interesting, I&apos;d love to hear about it.
          </p>
        </div>

        <Section title="Experience">
          {experience.map((item, i) => (
            <Entry key={i} {...item} />
          ))}
        </Section>

        <Section title="Side Projects">
          {sideProjects.map((item, i) => (
            <Entry key={i} {...item} />
          ))}
        </Section>

      </div>
    </div>
  );
}
