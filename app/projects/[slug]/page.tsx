import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProject, projects, type CaseStudyImage } from '@/lib/projects';
import CaseStudyInfo from '@/components/CaseStudyInfo';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function groupImages(images: CaseStudyImage[]): Array<CaseStudyImage | [CaseStudyImage, CaseStudyImage]> {
  const groups: Array<CaseStudyImage | [CaseStudyImage, CaseStudyImage]> = [];
  let i = 0;
  while (i < images.length) {
    if (images[i].layout === 'half' && i + 1 < images.length && images[i + 1].layout === 'half') {
      groups.push([images[i], images[i + 1]]);
      i += 2;
    } else {
      groups.push(images[i]);
      i++;
    }
  }
  return groups;
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const imageGroups = groupImages(project.caseStudy.images);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white pt-16">
      {/* Left — sticky panel (shows below images on mobile) */}
      <aside className="order-2 lg:order-1 w-full lg:w-[480px] shrink-0 lg:sticky lg:top-16 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto overscroll-y-contain flex flex-col justify-between px-6 py-8 lg:pl-10 lg:pr-3 lg:py-12">
        <div>
          <CaseStudyInfo project={project} />
        </div>
      </aside>

      {/* Right — scrollable images (shows above info on mobile) */}
      <main className="order-1 lg:order-2 flex-1 px-6 py-8 lg:pl-8 lg:pr-16 lg:py-16 space-y-8">
        {imageGroups.map((group, i) => {
          if (Array.isArray(group)) {
            return (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.map((img) => (
                  <div key={img.src} className="relative aspect-square w-full bg-neutral-900 overflow-hidden rounded-md">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div key={group.src} className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden rounded-md">
              <Image src={group.src} alt={group.alt} fill className="object-cover" />
            </div>
          );
        })}
      </main>
    </div>
  );
}
