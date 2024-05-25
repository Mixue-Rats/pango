export interface Event {
    _id: string,
    title: string,
    desc: string,
    location: string,
    startDateTime: string,
    endDateTime: string,
    orgEmail: string,
    createdDate: string,
    participants: string[]
};

export interface EventsListProps {
    events: Event[]
}