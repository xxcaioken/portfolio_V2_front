type SkeletonProps = { className?: string };

const Skeleton = ({ className = '' }: SkeletonProps) => (
  <div className={`relative overflow-hidden rounded bg-beige-200 dark:bg-stone-800 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/8" />
  </div>
);

export default Skeleton;
