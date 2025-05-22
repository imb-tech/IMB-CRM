export default function generateTimeSlots(startTime: string, endTime: string, interval: number) {
    const startSplit = startTime.split(":");
    const endSplit = endTime.split(":");

    const startHour = parseInt(startSplit[0]);
    const startMinute = parseInt(startSplit[1]);
    const endHour = parseInt(endSplit[0]);
    const endMinute = parseInt(endSplit[1]);

    let currentHour = startHour;
    let currentMinute = startMinute;

    const timeSlots: string[] = [];

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        timeSlots.push(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
        currentMinute += interval;
        if (currentMinute >= 60) {
            currentHour++;
            currentMinute -= 60;
        }
    }

    return timeSlots;
}

