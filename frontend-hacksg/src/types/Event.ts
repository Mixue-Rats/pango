export interface Event {
    _id: string,
    title: string,
    desc: string,
    location: string,
    lat: number,
    lng: number,
    startDateTime: string,
    endDateTime: string,
    image: string,
    orgEmail: string,
    createdDate: string,
    participants: string[]
};

export interface EventsListProps {
    events: Event[]
}