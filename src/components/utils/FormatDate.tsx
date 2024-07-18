export default function formateDateFromString (dateString: string): string {
    return dateString.split("T")[0];
}
