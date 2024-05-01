import * as React from "react";
import { memo, useEffect, useState } from "react";
import { mergeStyleSets } from "@fluentui/react";
import CalendarGrid from "../Components/CalendarGrid";

const Calendar = memo((props: { context: ComponentFramework.Context<any> }) => {

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {


    }, []);

    const updateMonth = (changeBy: number) => {
        setSelectedMonth((current) => current + changeBy);
    }

    const updateYear = (changeBy: number) => {
        setSelectedYear((current) => current + changeBy);
    }

    return (
        <>
            <div>
                {new Date(selectedYear, selectedMonth).toLocaleString('default', {month: 'long', year: 'numeric' })}
            </div>
            <div>
                <button onClick={() => updateYear(-1)}>&#10092;</button>
                <span>Year</span>
                <button onClick={() => updateYear(1)}>&#10093;</button>
            </div>
            <div>
                <button onClick={() => updateMonth(-1)}>&#10092;</button>
                <span>Month</span>
                <button onClick={() => updateMonth(1)}>&#10093;</button>
            </div>
            <div className={styles.wrapper}>
                <CalendarGrid context={props.context} selectedYear={selectedYear} selectedMonth={selectedMonth} />
            </div>
        </>
    );
});

const styles = mergeStyleSets({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export default Calendar;