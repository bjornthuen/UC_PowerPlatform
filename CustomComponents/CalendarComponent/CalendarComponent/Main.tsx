import * as React from "react";
import { memo, useEffect } from "react";
import Calendar from './Containers/Calendar'

const Main = memo((props: { context: ComponentFramework.Context<any>, isInitializing: boolean, isLoading: boolean }) => {

    useEffect(() => {

        if (props.isInitializing || props.isLoading) {
            return;
        }


    }, [props.isInitializing, props.isLoading]);

    return (
        <>
            <Calendar context={props.context} />
        </>
    );
})

export default Main;