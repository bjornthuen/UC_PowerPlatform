import * as React from "react";
import Main from './Main';
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class CalendarComponent implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    private context: ComponentFramework.Context<IInputs>;
    private isInitializing: boolean = true;
    private isLoading: boolean = false;
    private columns: string[] = [];

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.context = context;
        this.context.mode.trackContainerResize(true);

        const dataset = this.context.parameters.dataset;
        dataset.filtering.clearFilter();

        const setDataSetOptionsAndRefresh = (dataset: ComponentFramework.PropertyTypes.DataSet) => {

        }

        setDataSetOptionsAndRefresh(dataset);
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement
    {
        const dataset = context.parameters.dataset;
        if (dataset.paging.hasNextPage) {
            dataset.paging.setPageSize(5000);
            dataset.paging.loadNextPage();
        }

        if (this.isInitializing) {
            this.isInitializing = !this.columns.every(column => context.parameters.dataset.columns.map(x => x.name).includes(column));
        }

        this.isLoading = context.parameters.dataset.loading;

        return React.createElement(
            Main,
            { context, isInitializing: this.isInitializing, isLoading: this.isLoading }
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
