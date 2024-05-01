import * as React from "react";
import { mergeStyleSets } from "@fluentui/react";
import { memo, useEffect, useState } from "react";

interface CalendarGridState {
    daysOfMonth: number,
    firstDayOfMonth: number,
    currentDayOfMonth?: DaysOfWeek
}

enum DaysOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

const weekDays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

const CalendarGrid = memo((props: { context: ComponentFramework.Context<any>, selectedYear: number, selectedMonth: number }) => {

    const currentDate = new Date();

    const [state, setState] = useState<CalendarGridState>({
        daysOfMonth: numDays(currentDate.getFullYear(), currentDate.getMonth()),
        firstDayOfMonth: currentDate.getDay(),
        currentDayOfMonth: new Date().getDate()
    });

    useEffect(() => {
        setState((current) => ({
            ...current,
            daysOfMonth: numDays(props.selectedYear, props.selectedMonth+1),
            firstDayOfMonth: new Date(props.selectedYear, props.selectedMonth, 1).getDay(),
            currentDayOfMonth: currentDate.getMonth() === props.selectedMonth ? currentDate.getDate() : undefined
        }));

    }, [props.selectedYear, props.selectedMonth]);


    const days = [];

    // Calculate start depends if firstday of the month is sunday, then start -6 else start 1.
    const calculateStart = state.firstDayOfMonth == 0 ? -6 : 1;

    for (let i = calculateStart; i <= state.daysOfMonth + state.firstDayOfMonth - 1; i++) {

        let day = <div key={`day-${i}`} className={styles.day}></div>

        if (i >= state.firstDayOfMonth) {
            let dayNum = i - state.firstDayOfMonth + 1; 
            day = <div key={`day-${i}-${dayNum}`} className={styles.day}>{dayNum}</div>

            if (i - state.firstDayOfMonth + 1 === currentDate.getDate() &&
                props.selectedYear === currentDate.getFullYear() &&
                props.selectedMonth === currentDate.getMonth()
            ) {
                day = <div key={`day-${i}-${dayNum}`} className={styles.currentDay}>{dayNum}</div>
            }
        }

        days.push(day);
    }

    const headers = weekDays.map((weekday, index) => <div key={`wd-${index}`} className={styles.header}>{weekday}</div>)

    return (
        <div className={styles.grid}>
            {headers}
            {days}
        </div>
    );
});

const numDays = (y: number, m: number) => new Date(y, m, 0).getDate();

const styles = mergeStyleSets({
    grid: {
        display: 'grid',
        gridTemplateAreas:
            `'monday tuesday wednesday thursday friday saturday sunday'`

    },
    header: {
        marginTop: '1px',
        marginBottom: '1px',
        marginLeft: '5px',
        marginRight: '5px',
        fontWeight: 'bold'
    },
    day: {
        marginTop: '1px',
        marginBottom: '1px',
        marginLeft: '5px',
        marginRight: '5px'
    },
    currentDay: {
        marginTop: '1px',
        marginBottom: '1px',
        marginLeft: '5px',
        marginRight: '5px',
        fontWeight: 'bold'
    },
});


export default CalendarGrid;