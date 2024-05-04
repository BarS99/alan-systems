import { render, screen } from "@testing-library/react";
import EventForm from "./EventForm";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { act } from "react";

let store: any;
beforeEach(() => {
  act(() => {
    const tagsSlice = createSlice({
      name: "tags",
      initialState: {
        items: ["tag-1", "tag-2", "tag-3"],
        error: false,
        loading: false,
      },
      reducers: {},
    });

    store = configureStore({
      reducer: {
        tags: tagsSlice.reducer,
      },
    });
  });
});

it("should initialize a form", async () => {
  render(
    <Provider store={store}>
      <EventForm onSubmit={() => {}} />
    </Provider>
  );
  const form = screen.getByTestId("event-form");

  await new Promise((r) => setTimeout(r, 10));
  expect(form).toBeInTheDocument();
});

it("should render all inputs", async () => {
  render(
    <Provider store={store}>
      <EventForm onSubmit={() => {}} />
    </Provider>
  );

  const dateInput = screen.getByTestId("date");
  const descriptionInput = screen.getByTestId("description");
  const emailInput = screen.getByTestId("email");
  const imageInput = screen.getByTestId("image");
  const locationInput = screen.getByTestId("location");
  const nameInput = screen.getByTestId("name");
  const phoneInput = screen.getByTestId("phone");
  const tagsInput = screen.getAllByTestId("tags");

  await new Promise((r) => setTimeout(r, 10));
  expect(dateInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(imageInput).toBeInTheDocument();
  expect(locationInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  tagsInput.forEach((tag) => {
    expect(tag).toBeInTheDocument();
  });
});

describe("submit button", () => {
  it("should render a submit button", async () => {
    render(
      <Provider store={store}>
        <EventForm onSubmit={() => {}} />
      </Provider>
    );

    const submitButton = screen.getByTestId("submit-button");

    await new Promise((r) => setTimeout(r, 10));
    expect(submitButton).toBeDisabled();
  });

  it("should be disabled if the form is submitting", async () => {
    render(
      <Provider store={store}>
        <EventForm onSubmit={() => {}} submitting={true} />
      </Provider>
    );

    const submitButton = screen.getByTestId("submit-button");

    await new Promise((r) => setTimeout(r, 10));
    expect(submitButton).toBeDisabled();
  });

  it("should be disabled if the form is not valid", async () => {
    render(
      <Provider store={store}>
        <EventForm onSubmit={() => {}} submitting={false} />
      </Provider>
    );

    const submitButton = screen.getByTestId("submit-button");

    await new Promise((r) => setTimeout(r, 10));
    expect(submitButton).toBeDisabled();
  });
});
