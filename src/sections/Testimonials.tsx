import { useEffect, useState, type ReactElement } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { testimonialsApi } from '../lib/testimonials';
import type { TestimonialResponse } from '../types/testimonial';
import { useI18n } from '../i18n';

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
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 }
    }
  ],
};

const Testimonials = (): ReactElement => {
  const { lang } = useI18n();
  const [items, setItems] = useState<TestimonialResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <section className="container-page py-16 sm:py-24">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Feedbacks</h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm">Destaques de pessoas que trabalharam comigo</p>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {loading ? <p className="text-sm">Carregando...</p> : (
        items.length > 0 ? (
          <div className="relative">
            <Slider {...sliderSettings}>
              {items.map((it) => (
                <div key={it.id} className="outline-none px-2">
                  <div className="h-full rounded-md bg-white p-6 shadow dark:bg-stone-900/70">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{it.name}</h3>
                      <span className="text-xs text-stone-500">{new Date(it.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{it.highlight}</p>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-17 sm:w-24 md:w-32 bg-linear-to-r from-white/80 to-transparent dark:from-stone-900/80 backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-17 sm:w-24 md:w-32 bg-linear-to-l from-white/80 to-transparent dark:from-stone-900/80 backdrop-blur-[2px]" />
          </div>
        ) : <p className="text-sm text-stone-600 dark:text-stone-400">Nenhum feedback disponível.</p>
      )}
    </section>
  );
};

export default Testimonials;


