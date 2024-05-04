import Alert from "components/ui/Alert";
import Badge from "components/ui/Badge";
import Spinner from "components/ui/Spinner";
import { EventItem } from "models/event.model";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchEventById } from "store/slices/eventSlice";
import { AppDispatch, RootState } from "store/store";
import { formatDate } from "utilities/date-formatter";

const EventPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useSelector((state: RootState) => state.event);

  useEffect(() => {
    dispatch(fetchEventById(id as string));
  }, [dispatch, id]);

  const ComponentAlert: React.FC = () => (
    <div className="self-start w-full">
      <Alert>Such an event does not exist!</Alert>
    </div>
  );

  const ComponentContent: React.FC<{ data: EventItem }> = ({ data }) => (
    <div className="flex flex-col gap-8 w-full h-full">
      <div className="flex flex-col md:block text-base">
        <img
          src={data.image}
          alt={data.name}
          width={300}
          height={200}
          className="max-w-md w-full rounded-lg mx-auto mb-8 md:mb-2 md:me-8 md:float-start"
        />
        <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
        {data.tags.length > 0 && (
          <div className="inline-flex gap-2 mb-4">
            {data.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
        <p className="mb-2 text-sm font-bold">
          <span>Location: </span>
          <span>{`${data.address}, ${formatDate(data.date)}`}</span>
        </p>
        <p className="mb-2 text-sm font-bold">
          <span>Email: </span>
          <a
            className="underline hover:text-blue-11 focus-visible:text-blue-11"
            href={`mailto:${data.email}`}
          >
            {data.email}
          </a>
        </p>
        <p className="mb-4 text-sm font-bold">
          <span>Phone: </span>
          <a
            className="underline hover:text-blue-11 focus-visible:text-blue-11"
            href={`tel:${data.phone}`}
          >
            {data.phone}
          </a>
        </p>
        <p>{data.description}</p>
      </div>
    </div>
  );

  const ComponentSpinner: React.FC = () => (
    <div className="self-center mx-auto">
      <Spinner />
    </div>
  );

  const ComponentButton: React.FC = () => (
    <div className="text-center mt-auto">
      <Link to="../" className="btn btn-outline-success">
        Back To List
      </Link>
    </div>
  );

  return (
    <section className="flex flex-col gap-8 h-full w-full">
      <div className="flex grow">
        {!loading && data === null && <ComponentAlert />}
        {!loading && data !== null && <ComponentContent data={data} />}
        {loading && <ComponentSpinner />}
      </div>
      <ComponentButton />
    </section>
  );
};

export default EventPage;
