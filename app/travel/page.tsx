import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import TrackPageView from "@/components/TrackPageView";

interface TravelImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

const travelImages: TravelImage[] = [
  {
    src: "/vietnam-ninh-binh-ngoa-long.jpg",
    alt: "núi ngoa long - ninh binh, vietnam",
    caption: "núi ngoa long - ninh binh, vietnam",
    width: 800,
    height: 600,
  },
  {
    src: "/greece-naxos-mt-zas.jpeg",
    alt: "mount zas - naxos, greece",
    caption: "mount zas - naxos, greece",
    width: 2400,
    height: 1800,
  },
  {
    src: "/japan-osaka-dotonbori.jpg",
    alt: "dotonbori - osaka, japan",
    caption: "dotonbori - osaka, japan",
    width: 450,
    height: 600,
  },
  {
    src: "/bali-uluwatu-bingin-beach.jpg",
    alt: "bingin beach - uluwatu, bali",
    caption: "bingin beach - uluwatu, bali",
    width: 800,
    height: 600,
  },
  {
    src: "/greece-milos-best-beach.jpeg",
    alt: "best beach - milos, greece",
    caption: "best beach - milos, greece",
    width: 1818,
    height: 1228,
  },
  {
    src: "/italy-positano-beach.jpg",
    alt: "positano, italy",
    caption: "positano, italy",
    width: 600,
    height: 450,
  },
  {
    src: "/greece-milos-fishing-village.jpeg",
    alt: "fishing village - milos, greece",
    caption: "fishing village - milos, greece",
    width: 2400,
    height: 1800,
  },
  {
    src: "/us-california-slo.jpeg",
    alt: "san luis obispo - california, us",
    caption: "san luis obispo - california, us",
    width: 1536,
    height: 2048,
  },
  {
    src: "/greece-milos-fishing-boats.jpeg",
    alt: "cool boats - milos, greece",
    caption: "cool boats - milos, greece",
    width: 1818,
    height: 1228,
  },
  {
    src: "/bali-ubud-rice-terraces.jpg",
    alt: "rice terraces - ubud, bali",
    caption: "rice terraces - ubud, bali",
    width: 800,
    height: 600,
  },
  {
    src: "/us-boulder-chautauqua-park.jpg",
    alt: "chautauqua park - boulder, us",
    caption: "chautauqua park - boulder, us",
    width: 800,
    height: 600,
  },
  {
    src: "/greece-milos-hotel-view.jpeg",
    alt: "wow - milos, greece",
    caption: "wow - milos, greece",
    width: 1818,
    height: 1228,
  },
  {
    src: "/bali-kintamani-ulun-danu-batur.jpg",
    alt: "ulun danu batur - kintamani, bali",
    caption: "ulun danu batur - kintamani, bali",
    width: 800,
    height: 600,
  },
  {
    src: "/us-boulder-flatirons.jpg",
    alt: "flatirons - boulder, us",
    caption: "flatirons - boulder, us",
    width: 2410,
    height: 600,
  },
  {
    src: "/greece-milos-medusa.jpeg",
    alt: "medusa - milos, greece",
    caption: "medusa - milos, greece",
    width: 1869,
    height: 2400,
  },
  {
    src: "/japan-kyoto-fushimi-inari.jpg",
    alt: "fushimi inari - kyoto, japan",
    caption: "fushimi inari - kyoto, japan",
    width: 450,
    height: 600,
  },
  {
    src: "/us-new-york-big-apple.jpg",
    alt: "the big apple - new york, us",
    caption: "the big 🍎",
    width: 800,
    height: 600,
  },
  {
    src: "/us-new-york-central-park-garden.jpeg",
    alt: "central park garden - new york, us",
    caption: "central park garden - new york, us",
    width: 2208,
    height: 1656,
  },
  {
    src: "/japan-kyoto-gion-district.jpg",
    alt: "gion district - kyoto, japan",
    caption: "gion district - kyoto, japan",
    width: 450,
    height: 600,
  },
  {
    src: "/greece-paros-castle.jpeg",
    alt: "castle - paros, greece",
    caption: "castle - paros, greece",
    width: 1818,
    height: 1228,
  },
  {
    src: "/us-wyoming-jackson-hole.jpeg",
    alt: "jackson hole - wyoming, us",
    caption: "jackson hole - wyoming, us",
    width: 2048,
    height: 1536,
  },
  {
    src: "/us-idaho-sun-valley-ice-hockey.jpeg",
    alt: "ice hockey - sun valley, idaho, us",
    caption: "ice hockey - sun valley, idaho, us",
    width: 1200,
    height: 1501,
  },
  {
    src: "/japan-kyoto-kinkaku-ji.jpg",
    alt: "kinkaku-ji - kyoto, japan",
    caption: "kinkaku-ji - kyoto, japan",
    width: 800,
    height: 600,
  },
  {
    src: "/costa-rica-papagayo-peninsula.jpg",
    alt: "papagayo peninsula - costa rica",
    caption: "papagayo peninsula - costa rica",
    width: 1800,
    height: 2400,
  },
  {
    src: "/greece-paros-party.jpeg",
    alt: "paros, greece",
    caption: "paros, greece",
    width: 1818,
    height: 1228,
  },
  {
    src: "/vietnam-ha-long-bay.jpg",
    alt: "ha long bay, vietnam",
    caption: "ha long bay, vietnam",
    width: 450,
    height: 600,
  },
  {
    src: "/germany-berlin-cathedral.jpeg",
    alt: "berlin cathedral - berlin, germany",
    caption: "berlin cathedral - berlin, germany",
    width: 2400,
    height: 1800,
  },
  {
    src: "/japan-kyoto-bamboo-forest.jpg",
    alt: "bamboo forest - kyoto, japan",
    caption: "bamboo forest - kyoto, japan",
    width: 450,
    height: 600,
  },
  {
    src: "/vietnam-hanoi-train-street.jpg",
    alt: "hanoi train street - hanoi, vietnam",
    caption: "hanoi train street - hanoi, vietnam",
    width: 450,
    height: 600,
  },
  {
    src: "/us-new-york-friends-fidi.jpeg",
    alt: "friends - fidi, new york, us",
    caption: "friends - fidi, new york, us",
    width: 2400,
    height: 1591,
  },
  {
    src: "/japan-tokyo-skytree.jpg",
    alt: "skytree - tokyo, japan",
    caption: "skytree - tokyo, japan",
    width: 450,
    height: 600,
  },
];

// Desktop zig-zag (center/end/center/start) is pure CSS via md: variants, so
// there is no post-hydration layout switch. Mobile stays centered. Alignment
// uses items-* on the full-width row so the figure below gets a definite
// containing width on the first layout pass (no circular percentage sizing).
function alignmentClass(index: number): string {
  if (index % 4 === 1) return "md:items-end";
  if (index % 4 === 3) return "md:items-start";
  return "";
}

export default function TravelPage() {
  return (
    <PageLayout
      className="px-9 overflow-hidden"
      title="you should visit... ✈️"
      titleClassName="mb-16"
    >
      <TrackPageView event="travel_page_view" />
      <div className="w-full relative z-10">
        <div className="flex flex-col items-center justify-center relative py-5 w-full gap-10">
          {travelImages.map((image, index) => {
            const topLeft = index % 2 === 0;

            return (
              <div
                key={image.src}
                className={`relative z-10 w-full flex flex-col items-center ${alignmentClass(index)}`}
              >
                <figure className="flex flex-col items-center justify-center relative group transition-all duration-300 hover:scale-105 w-full max-w-[500px] md:w-[700px]">
                  <div className="relative w-full">
                    <div className="absolute inset-0 rounded-xl bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 572px) 500px, calc(100vw - 72px)"
                      priority={index < 2}
                      className="rounded-xl shadow-2xl border-4 border-primary/30 relative bg-background w-full h-auto group-hover:border-primary/60 group-hover:shadow-primary/20 transition-all"
                    />
                    <span
                      className={`absolute text-4xl z-20 pointer-events-none drop-shadow-lg filter ${
                        topLeft ? "top-3 left-3" : "top-3 right-3"
                      }`}
                      style={{ transform: `rotate(${topLeft ? -15 : 15}deg)` }}
                    >
                      📍
                    </span>
                  </div>
                  <figcaption className="mt-4 px-5 py-3 rounded-xl bg-primary/15 border-2 border-primary/30 text-primary text-base font-semibold text-center backdrop-blur-sm group-hover:bg-primary/20 group-hover:border-primary/40 transition-all shadow-md">
                    {image.caption}
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
