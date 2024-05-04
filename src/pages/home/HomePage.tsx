import Alert from "components/ui/Alert";
import Card from "components/ui/Card";
import Spinner from "components/ui/Spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "store/slices/eventsSlice";
import { AppDispatch, RootState } from "store/store";
import { formatDate } from "utilities/date-formatter";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const ComponentAlert: React.FC = () => (
    <div className="self-start w-full">
      <Alert>The list is empty!</Alert>
    </div>
  );

  const ComponentList: React.FC = () => (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 self-start">
      {items.map((data) => (
        <Card
          key={data.id}
          title={data.name}
          image={{
            url: data.image,
            alt: data.name,
          }}
          content={
            <>
              <p className="text-base font-bold">{data.address}</p>
              <p className="text-base font-bold">{formatDate(data.date)}</p>
              <p className="text-base line-clamp-4 mt-2">{data.description}</p>
            </>
          }
          footer={
            <Link
              to={`/event/${data.id}`}
              className="btn btn-outline-success btn-block"
            >
              View
            </Link>
          }
        />
      ))}
    </div>
  );

  const ComponentSpinner: React.FC = () => (
    <div className="self-center mx-auto">
      <Spinner />
    </div>
  );

  const ComponentButton: React.FC = () => (
    <div className="text-center">
      <Link to="/event/add" className="btn btn-outline-success">
        Add Event
      </Link>
    </div>
  );

  return (
    <section className="flex flex-col gap-8 w-full h-full">
      <h1 className="text-3xl font-bold text-center">Events</h1>
      <div className="flex grow">
        {!loading && items.length === 0 && <ComponentAlert />}
        {!loading && items.length > 0 && <ComponentList />}
        {loading && <ComponentSpinner />}
      </div>
      <ComponentButton />
    </section>
  );
};

export default HomePage;
