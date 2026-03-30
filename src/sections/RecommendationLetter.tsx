import { type ReactElement } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { recommendationLettersApi } from '../lib/recommendationLetters';
import type { RecommendationLetterResponse } from '../types/recommendationLetter';
import { useI18n } from '../i18n';
import { resolveApiUrl } from '../lib/api';
import SectionHeading from '../components/ui/SectionHeading';
import Skeleton from '../components/ui/Skeleton';
import { useInView } from '../lib/useInView';
import { useCache } from '../lib/useCache';

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
  const { t, lang } = useI18n();
  const { data, loading, error } = useCache<RecommendationLetterResponse[]>('recommendation_letters', () => recommendationLettersApi.list());
  const { ref, inView } = useInView<HTMLElement>();

  const imgs = (data ?? [])
    .map(it => {
      const raw = lang === 'en' ? (it.imageUrlEn ?? '') : (it.imageUrlPt ?? '');
      const src = resolveApiUrl(raw);
      return { src, alt: `${t('section.recommendations')} ${lang.toUpperCase()}` };
    })
    .filter(x => !!x.src);

  return (
    <section
      ref={ref}
      className="container-page py-16 sm:py-24 transition-[opacity,transform] duration-500 ease-out"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <SectionHeading title={t('section.recommendations')} subtitle={t('section.recommendationsSubtitle')} />
      {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
      {loading ? (
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-[500px] w-full max-w-2xl mx-auto" />
          <div className="flex gap-2">
            {[0, 1, 2].map(i => <Skeleton key={i} className="h-2.5 w-2.5 rounded-full" />)}
          </div>
        </div>
      ) : (
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
        ) : <p className="text-sm text-stone-600 dark:text-stone-400">{t('section.noRecommendations')}</p>
      )}
    </section>
  );
};

export default RecommendationLetters;
