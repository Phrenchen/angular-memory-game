export class MathHelper {

    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static shuffleArray(array: any[]): any[] {
        const shuffleCount = 20;

        for (let i = 0; i < shuffleCount; i++) {
            array = array.sort(() => {
                return .5 - Math.random();
            });
        }
        return array;
    }
}
