'use client';

const variants = {
  primary: 'from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25 hover:shadow-indigo-500/30',
  upload: 'from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/25 hover:shadow-emerald-500/30',
};

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  className = '',
}) => {
  const base = [
    'px-6 py-3 rounded-xl font-semibold text-sm text-white',
    'bg-gradient-to-r shadow-lg transition-all duration-200',
    'inline-flex items-center justify-center gap-2',
    fullWidth ? 'w-full' : '',
    disabled
      ? 'from-gray-400 to-gray-500 cursor-not-allowed opacity-70'
      : `${variants[variant] ?? variants.primary} hover:shadow-xl`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
};

export default Button;
