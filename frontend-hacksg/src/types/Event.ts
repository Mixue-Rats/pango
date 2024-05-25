export interface Event {
    _id: string,
    title: string,
    desc: string,
    location: string,
    startDate: string,
    endDate: string,
    orgEmail: string,
    createdDate: string,
    participants: string[]
};

export interface EventsListProps {
    events: Event[]
}