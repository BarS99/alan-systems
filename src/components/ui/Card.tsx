export interface CardProps {
  image?: {
    url: string;
    alt: string;
  };
  title?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = (data: CardProps) => {
  return (
    <div className="card card-image-cover overflow-hidden w-full max-w-full bg-blue-3">
      {data.image && (
        <img
          src={data.image.url}
          alt={data.image.alt}
          width={300}
          height={200}
          className="w-full aspect-[3/2] object-cover"
        />
      )}
      <div className="card-body grow">
        {data.title && <h2 className="card-header">{data.title}</h2>}
        {data.content && <div className="text-content2">{data.content}</div>}
        {data.footer && (
          <div className="card-footer mt-auto">{data.footer}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
