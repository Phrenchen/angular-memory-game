export class MathHelper {

    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static shuffleArray(array: any[]): any[] {
        array = array.sort(() => {
            return .5 - Math.random();
        });

        return array;
    }
}
