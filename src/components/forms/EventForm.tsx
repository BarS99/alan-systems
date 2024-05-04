import Spinner from "components/ui/Spinner";
import SpinnerWave from "components/ui/SpinnerWave";
import { Field, Formik, Form } from "formik";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "store/slices/tagsSlice";
import { AppDispatch, RootState } from "store/store";
import { fileToBase64 } from "utilities/file-parser";
import * as Yup from "yup";

interface EventFormProps {
  onSubmit: (values: any) => void;
  submitting?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  submitting,
}: EventFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: tags, loading: tagsLoading } = useSelector(
    (state: RootState) => state.tags
  );
  const imageRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const PHONE_REGEX = /^[0-9]{9}$/;

  const validationSchema = Yup.object<{ name: string }>().shape({
    date: Yup.date().required(),
    description: Yup.string().required(),
    email: Yup.string()
      .matches(EMAIL_REGEX, {
        message:
          "You must provide a valid email address (format: email@example.com)",
      })
      .required(),
    image: Yup.mixed().required(),
    location: Yup.string().required(),
    name: Yup.string().required(),
    phone: Yup.string()
      .matches(PHONE_REGEX, {
        message: "You must provide a valid phone number (format: 123456789)",
      })
      .required(),
    tags: Yup.array().min(1, "Select at least one tag"),
  });

  return (
    <div className="relative">
      <Formik
        onSubmit={async (values) => onSubmit(values)}
        onReset={(_, { validateForm }) => {
          setTimeout(() => {
            if (imageRef.current) imageRef.current.value = "";
            validateForm();
          });
        }}
        validateOnMount={true}
        initialValues={{
          date: "",
          description: "",
          email: "",
          image: "",
          location: "",
          name: "",
          phone: "",
          tags: [],
        }}
        validationSchema={validationSchema}
      >
        {({ isValid, errors, touched, setFieldValue }) => (
          <Form
            className={`space-y-4 ${submitting ? "invisible" : ""}`.trim()}
            data-testid="event-form"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="name">
                  Event Name
                </label>
                <Field
                  className="input input-solid max-w-full"
                  placeholder="Event name*"
                  type="text"
                  id="name"
                  name="name"
                  data-testid="name"
                />
                {touched.name && errors.name && (
                  <span className="form-label-alt text-error capitalize">
                    {errors.name}
                  </span>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="date">
                  Date
                </label>
                <Field
                  className="input input-solid max-w-full"
                  placeholder="Date*"
                  type="datetime-local"
                  id="date"
                  name="date"
                  data-testid="date"
                />
                {touched.date && errors.date && (
                  <span className="form-label-alt text-error capitalize">
                    {errors.date}
                  </span>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="location">
                  Location
                </label>
                <Field
                  className="input input-solid max-w-full"
                  placeholder="Location*"
                  type="text"
                  id="location"
                  name="location"
                  data-testid="location"
                />
                {touched.location && errors.location && (
                  <span className="form-label-alt text-error capitalize">
                    {errors.location}
                  </span>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="email">
                  Email Address
                </label>
                <Field
                  className="input input-solid max-w-full"
                  placeholder="Email address*"
                  type="text"
                  id="email"
                  name="email"
                  data-testid="email"
                />
                {touched.email && errors.email && (
                  <span className="form-label-alt text-error capitalize">
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">
                  Phone Number
                </label>
                <Field
                  className="input input-solid max-w-full"
                  placeholder="Phone number*"
                  type="text"
                  id="phone"
                  name="phone"
                  data-testid="phone"
                />
                {touched.phone && errors.phone && (
                  <span className="form-label-alt text-error capitalize">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="image">
                  Image
                </label>
                <input
                  className="input-file max-w-full"
                  placeholder="Image*"
                  type="file"
                  id="image"
                  name="image"
                  data-testid="image"
                  ref={imageRef}
                  onChange={async (e) => {
                    const file = e.target.files?.[0] ?? null;
                    if (file !== null) {
                      const base64 = await fileToBase64(file);
                      setFieldValue("image", base64);
                    } else {
                      setFieldValue("image", "");
                    }
                  }}
                />
                {touched.image && errors.image && (
                  <span className="form-label-alt text-error capitalize">
                    {errors.image}
                  </span>
                )}
              </div>
            </div>

            <fieldset className="w-full">
              <legend className="block my-2">Tags: </legend>
              {!tagsLoading && (
                <div className="flex flex-wrap gap-4">
                  {tags.map((tag) => (
                    <label
                      key={tag}
                      className="flex gap-2"
                      htmlFor={`tag-${tag}`}
                    >
                      <Field
                        type="checkbox"
                        id={`tag-${tag}`}
                        name="tags"
                        value={tag}
                        data-testid="tags"
                      />
                      <span className="capitalize">{tag}</span>
                    </label>
                  ))}
                </div>
              )}
              {tagsLoading && <SpinnerWave />}
              {touched.tags && errors.tags && (
                <span className="form-label-alt text-error capitalize">
                  {errors.tags}
                </span>
              )}
            </fieldset>

            <div className="w-full">
              <label className="sr-only" htmlFor="description">
                Description
              </label>
              <Field
                as="textarea"
                className="textarea textarea-solid max-w-full"
                placeholder="Description*"
                rows={8}
                id="description"
                name="description"
                data-testid="description"
              ></Field>
              {touched.description && errors.description && (
                <span className="form-label-alt text-error capitalize">
                  {errors.description}
                </span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex gap-4">
                <button type="reset" className="rounded-lg btn btn-block">
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className="rounded-lg btn btn-success btn-block"
                  data-testid="submit-button"
                >
                  Send Enquiry
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {submitting && (
        <div className="absolute inset-0 flex justify-center items-center">
          {<Spinner />}
        </div>
      )}
    </div>
  );
};

export default EventForm;
