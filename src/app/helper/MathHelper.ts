export class MathHelper {

    public static getRandomIntFrom(min: number, max: number, candidates: Array<number> = []): number {
        if (candidates) {
            const candidateIndex = MathHelper.getRandomInt(0, candidates.length);
            return candidates[candidateIndex];
        }
        return MathHelper.getRandomInt(min, max);
    }

    public static getRandomInt(min: number, max: number, ignore: Array<number> = []): number {
        let candidate: number;

        candidate = Math.floor(Math.random() * (max - min + 1)) + min;

        if (ignore) {
            while (ignore.find(i => { return i === candidate })) {
                candidate = Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
        return candidate;
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
