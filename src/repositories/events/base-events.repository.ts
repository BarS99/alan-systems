import { EventItem } from "models/event.model";

export default abstract class BaseEventsRepository {
  public abstract getEvents(): Promise<EventItem[]>;
  public abstract getEventById(id: string): Promise<EventItem | null>;
  public abstract saveEvent(event: EventItem): Promise<boolean>;
  public abstract getTags(): Promise<string[]>;
}
