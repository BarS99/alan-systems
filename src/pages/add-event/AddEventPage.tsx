import { Link, useNavigate } from "react-router-dom";
import { eventsService } from "services/events.service";
import { v4 as uuidv4 } from "uuid";
import EventForm from "components/forms/EventForm";
import { useState } from "react";

const AddEventPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const ComponentButton: React.FC = () => (
    <div className="text-center mt-auto">
      <Link to="../" className="btn btn-outline-success">
        Back To List
      </Link>
    </div>
  );

  return (
    <section className="flex flex-col gap-8 w-full h-full">
      <h1 className="text-3xl font-bold text-center">Add Event</h1>
      <div className="bg-gray-2 rounded-xl">
        <div className="p-8 shadow-lg relative">
          <EventForm
            submitting={submitting}
            onSubmit={async (values) => {
              try {
                setSubmitting(true);
                await eventsService.saveEvent({
                  address: values.location,
                  description: values.description,
                  email: values.email,
                  id: uuidv4(),
                  image: values.image,
                  name: values.name,
                  phone: values.phone,
                  tags: values.tags,
                  date: new Date(values.date).getTime(),
                });
                navigate("/", { unstable_flushSync: true });
              } catch {
                console.error("Failed to save event");
              } finally {
                setSubmitting(false);
              }
            }}
          />
        </div>
      </div>
      <ComponentButton />
    </section>
  );
};

export default AddEventPage;
