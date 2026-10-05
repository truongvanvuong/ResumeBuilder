import moment from "moment";

export function formatYearMonth(yearMonth: string): string {
    if (yearMonth) {
        return moment(yearMonth, "YYYY-MM").format('MMM YYYY');
    }
    return '';
}