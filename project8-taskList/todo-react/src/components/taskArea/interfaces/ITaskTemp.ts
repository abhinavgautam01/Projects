export interface ITaskTemp {
    id: string;         // Assuming ID is a string (UUID) or number
    title: string;
    description: string;
    date: string;       // You can use `Date` if needed instead of `string`
    status: string;     // Consider using an enum if status has fixed values
    priority: string;   // Consider using an enum if priority has fixed values
}
