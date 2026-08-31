import ScrollWarpImage from '@/components/ScrollWarpImage';
import HorizontalScroll from '@/components/HorizontalScroll';
import { projects } from '@/lib/projects';

export default function TestPage() {
  const images = [
    ...projects.flatMap(p =>
      p.coverImage ? [{ src: p.coverImage, alt: p.title }] : []
    ),
    ...projects[0].caseStudy.images.map(img => ({ src: img.src, alt: img.alt })),
  ];

  return (
    <div className="bg-black h-screen overflow-hidden pt-16">
      <HorizontalScroll>
        {images.map((img, i) => (
          <ScrollWarpImage
            key={i}
            src={img.src}
            alt={img.alt}
            className="shrink-0 h-[68vh]"
          />
        ))}
      </HorizontalScroll>
    </div>
  );
}
