import type { TestimonialResponse } from '../../../types/testimonial';

type Props = { item: TestimonialResponse };

const TestimonialItem = ({ item }: Props) => {
  return (
    <div className="rounded  bg-white ">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{item.name}</h4>
        <span className="text-xs text-stone-500">{new Date(item.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="text-sm text-stone-700 dark:text-stone-300 mt-2">{item.highlight}</p>
      <p className="text-xs text-stone-500">{item.highlight?.length} caracteres</p>
    </div>
  );
};

export default TestimonialItem;


