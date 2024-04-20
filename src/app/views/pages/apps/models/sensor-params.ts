export interface SensorParams {
    device_sn: string;
    start_date: string;
    end_date: string;
    // start_mrid: number;
    // end_mrid: number;
    output_format: string;
    page_num: number;
    per_page: number;
    device_depth: boolean;
    sort_by: string;
}