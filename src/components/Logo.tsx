const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-bold text-2xl ${className}`}>
      <span className="gradient-gold bg-clip-text text-transparent">Hand</span>
      <span className="text-secondary">M</span>
    </div>
  );
};

export default Logo;
