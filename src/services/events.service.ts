import { EventItem } from "models/event.model";
import BaseEventsRepository from "repositories/events/base-events.repository";
import { eventsRepository } from "repositories/events/events.repository";

class EventsService {
  constructor(private eventsRepository: BaseEventsRepository) {}

  public async getEvents() {
    return this.eventsRepository.getEvents();
  }

  public async getTags() {
    return this.eventsRepository.getTags();
  }

  public async saveEvent(event: EventItem) {
    return this.eventsRepository.saveEvent(event);
  }
}

const eventsService = Object.freeze(new EventsService(eventsRepository));
export { eventsService };
