import fotoAzulBeca from "@/assets/thais-azul-beca.jpg";
import fotoMaosUnidas from "@/assets/thais-bordo-maos-unidas.jpg";
import fotoAzulPoltrona from "@/assets/thais-azul-poltrona.jpg";
import fotoPernasCruzadas from "@/assets/thais-bordo-pernas-cruzadas.jpg";
import fotoAzulSentada from "@/assets/thais-azul-sentada.jpg";
import fotoCadeiraLado from "@/assets/thais-bordo-cadeira-lado.jpg";
import fotoAzulBlazer from "@/assets/thais-azul-blazer.jpg";
import fotoSentada from "@/assets/thais-bordo-sentada.jpg";

const photos = [
  { src: fotoAzulBeca, alt: "Dra. Thais Monteiro de beca" },
  { src: fotoMaosUnidas, alt: "Dra. Thais Monteiro com as mãos unidas" },
  { src: fotoAzulPoltrona, alt: "Dra. Thais Monteiro apoiada em uma poltrona de couro" },
  { src: fotoPernasCruzadas, alt: "Dra. Thais Monteiro sentada" },
  { src: fotoAzulSentada, alt: "Dra. Thais Monteiro sentada em uma poltrona de couro" },
  { src: fotoCadeiraLado, alt: "Dra. Thais Monteiro apoiada no encosto de uma cadeira" },
  { src: fotoAzulBlazer, alt: "Dra. Thais Monteiro ajustando o blazer" },
  { src: fotoSentada, alt: "Dra. Thais Monteiro sentada, com as mãos sobre o joelho" },
];

const GallerySection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-secondary">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-primary/70 text-sm tracking-[0.3em] uppercase">Galeria</span>
            <div className="w-12 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-gold">
            Presença e Convicção
          </h2>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="group relative overflow-hidden border border-primary/10 hover:border-primary/40 transition-colors duration-500"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full aspect-[3/4] object-cover object-top grayscale-[10%] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/50 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 gold-line" />
    </section>
  );
};

export default GallerySection;
