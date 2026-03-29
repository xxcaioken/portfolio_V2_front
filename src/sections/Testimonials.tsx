import { useEffect, useState, type ReactElement } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { testimonialsApi } from '../lib/testimonials';
import type { TestimonialResponse } from '../types/testimonial';
import { useI18n } from '../i18n';
import SectionHeading from '../components/ui/SectionHeading';
import { useInView } from '../lib/useInView';

const sliderSettings: Settings = {
  dots: true,
  arrows: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
  pauseOnHover: true,
  adaptiveHeight: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640,  settings: { slidesToShow: 1 } },
  ],
};

const Testimonials = (): ReactElement => {
  const { lang } = useI18n();
  const [items, setItems] = useState<TestimonialResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView<HTMLElement>();

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try { const data = await testimonialsApi.list(lang); setItems(Array.isArray(data) ? data : []); }
      catch (e) { setError(e instanceof Error ? e.message : 'Erro ao carregar'); }
      finally { setLoading(false); }
    };
    void load();
  }, [lang]);

  return (
    <section ref={ref} className={`container-page py-16 sm:py-24 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
      <SectionHeading title="Feedbacks" subtitle="Destaques de pessoas que trabalharam comigo" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {loading ? <p className="text-sm">Carregando...</p> : (
        items.length > 0 ? (
          <div className="relative">
            <Slider {...sliderSettings}>
              {items.map((it) => (
                <div key={it.id} className="outline-none px-2">
                  <div className="h-full rounded-xl border border-beige-200/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-stone-800/70 dark:bg-stone-900/70">
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug">{it.name}</h3>
                      <span className="shrink-0 text-xs text-stone-400 dark:text-stone-500 mt-0.5">{new Date(it.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</span>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">"{it.highlight}"</p>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-17 sm:w-24 md:w-32 bg-linear-to-r from-beige-50/90 to-transparent dark:from-stone-950/90" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-17 sm:w-24 md:w-32 bg-linear-to-l from-beige-50/90 to-transparent dark:from-stone-950/90" />
          </div>
        ) : <p className="text-sm text-stone-600 dark:text-stone-400">Nenhum feedback disponível.</p>
      )}
    </section>
  );
};

export default Testimonials;
