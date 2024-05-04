interface BadgeProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return <span className="badge badge-flat-primary bg-blue-3">{children}</span>;
};

export default Badge;
