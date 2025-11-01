import { useEffect, useState, type ReactElement } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { recommendationLettersApi } from '../lib/recommendationLetters';
import type { RecommendationLetterResponse } from '../types/recommendationLetter';
import { useI18n } from '../i18n';
import { resolveApiUrl } from '../lib/api';

const sliderSettings: Settings = {
  dots: true,
  arrows: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const RecommendationLetters = (): ReactElement => {
  const { lang } = useI18n();
  const [items, setItems] = useState<RecommendationLetterResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try { const data = await recommendationLettersApi.list(); setItems(Array.isArray(data) ? data : []); }
      catch (e) { setError(e instanceof Error ? e.message : 'Erro ao carregar'); }
      finally { setLoading(false); }
    };
    void load();
  }, []);

  const imgs = items
    .map(it => {
      const raw = lang === 'en' ? (it.imageUrlEn ?? '') : (it.imageUrlPt ?? '');
      const src = resolveApiUrl(raw);
      return { src, alt: `Carta ${lang.toUpperCase()}` };
    })
    .filter(x => !!x.src);

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Cartas de recomendação</h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm">Alguns destaques em recomendações</p>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {loading ? <p className="text-sm">Carregando...</p> : (
        imgs.length > 0 ? (
          <Slider {...sliderSettings}>
            {imgs.map((img, idx) => (
              <div key={idx} className="outline-none flex justify-center">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-[500px] w-auto object-contain rounded-md shadow mx-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        ) : <p className="text-sm text-stone-600 dark:text-stone-400">Nenhuma carta disponível.</p>
      )}
    </section>
  );
};

export default RecommendationLetters;


