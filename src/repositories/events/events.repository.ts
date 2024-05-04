import { EventItem, MOCK_IMAGE } from "models/event.model";
import { v4 as uuidv4 } from "uuid";
import BaseEventsRepository from "./base-events.repository";

const MOCK_TAGS: string[] = [
  "music",
  "concert",
  "sport",
  "theatre",
  "cinema",
  "festival",
  "conference",
  "exhibition",
  "party",
  "other",
];

const MOCK_EVENTS: EventItem[] = [
  {
    id: uuidv4(),
    name: "Concert of Coldplay",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut condimentum nulla. Phasellus ante quam, tristique vitae dapibus ac, lacinia quis mauris. Morbi id metus non risus posuere iaculis. Nullam eleifend ipsum et arcu venenatis tincidunt. Vestibulum suscipit diam non bibendum porttitor. Sed sit amet justo id purus sodales pharetra eget ac nisi. Fusce nisl dui, vulputate non leo ac, mattis vestibulum felis. Fusce suscipit leo risus, auctor sagittis felis lobortis luctus. Integer sed ex nibh. Sed pharetra et sem non mollis. Vivamus ut est ut orci congue pharetra at sit amet ante. Integer gravida, ex id iaculis consectetur, nisl lectus auctor diam, nec commodo nibh sem id libero. Etiam sollicitudin tempor ipsum at convallis. Nunc interdum ornare lectus vel luctus. Quisque ultrices, justo vitae imperdiet porttitor, purus tortor interdum eros, vitae porta tortor ligula tempor felis. Sed sed vehicula sem.",
    image: MOCK_IMAGE,
    address: "Warsaw, Poland",
    date: Date.now(),
    email: "test@test.com",
    phone: "123456789",
    tags: ["music", "concert"],
  },
  {
    id: uuidv4(),
    name: "Concert of Metallica",
    description:
      "Phasellus ante quam, tristique vitae dapibus ac, lacinia quis mauris. Morbi id metus non risus posuere iaculis. Nullam eleifend ipsum et arcu venenatis tincidunt. Vestibulum suscipit diam non bibendum porttitor. Sed sit amet justo id purus sodales pharetra eget ac nisi. Fusce nisl dui, vulputate non leo ac, mattis vestibulum felis. Fusce suscipit leo risus, auctor sagittis felis lobortis luctus. Integer sed ex nibh. Sed pharetra et sem non mollis. Vivamus ut est ut orci congue pharetra at sit amet ante. Integer gravida, ex id iaculis consectetur, nisl lectus auctor diam, nec commodo nibh sem id libero. Etiam sollicitudin tempor ipsum at convallis. Nunc interdum ornare lectus vel luctus. Quisque ultrices, justo vitae imperdiet porttitor, purus tortor interdum eros, vitae porta tortor ligula tempor felis. Sed sed vehicula sem.",
    image: MOCK_IMAGE,
    address: "Berlin, Germany",
    date: Date.now(),
    email: "test@test.com",
    phone: "123456789",
    tags: ["music", "concert", "party"],
  },
];

export class EventsRepository implements BaseEventsRepository {
  public async getEvents(): Promise<EventItem[]> {
    return new Promise((resolve) => {
      const events = JSON.parse(localStorage.getItem("events") ?? "[]");

      if (!events.length) {
        localStorage.setItem("events", JSON.stringify(MOCK_EVENTS));
      }

      setTimeout(() => {
        resolve(events.length ? events : MOCK_EVENTS);
      }, 500);
    });
  }

  public getEventById(id: string): Promise<EventItem | null> {
    return new Promise((resolve) => {
      const events = JSON.parse(localStorage.getItem("events") ?? "[]");

      if (!events.length) {
        localStorage.setItem("events", JSON.stringify(MOCK_EVENTS));
      }

      const event = (events.length ? events : MOCK_EVENTS).find(
        (item: EventItem) => item.id === id
      );

      setTimeout(() => {
        resolve(event ?? null);
      }, 500);
    });
  }

  public async getTags(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TAGS);
      }, 500);
    });
  }

  public async saveEvent(event: EventItem): Promise<boolean> {
    return new Promise((resolve) => {
      const events = JSON.parse(localStorage.getItem("events") ?? "[]");

      localStorage.setItem("events", JSON.stringify([...events, event]));

      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
}

const eventsRepository = Object.freeze(new EventsRepository());
export { eventsRepository };
