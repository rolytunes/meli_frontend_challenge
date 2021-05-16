export const Utils = {
    findPercent: (original: number, newValue: number) => {
        let percent = Math.round(
            ((original - newValue) / newValue) * 100
        );
        return percent.toString();
    }
}
    