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
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
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
          <Slider {...sliderSettings}>
            {items.map((it) => (
              <div key={it.id} className="outline-none">
                <div className="mx-auto max-w-3xl rounded-md border bg-white p-6 shadow dark:bg-stone-900/70">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{it.name}</h3>
                    <span className="text-xs text-stone-500">{new Date(it.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{it.highlight}</p>
                </div>
              </div>
            ))}
          </Slider>
        ) : <p className="text-sm text-stone-600 dark:text-stone-400">Nenhum feedback disponível.</p>
      )}
    </section>
  );
};

export default Testimonials;


