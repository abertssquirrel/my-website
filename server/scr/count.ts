export class Counter {
    readonly #file: string;
    #count: number = 0;

    constructor(name: string) {
        this.#file = `counters/${name}.txt`

        this.initialize()
    }

    private async initialize() {
        const countFile = Bun.file(this.#file)
        try {
            this.#count = parseInt(await countFile.text())
        } catch (error) {
            await countFile.write('0')
        }
    }

    public currentCount() {
        return this.#count
    }

    public async increment() {
        this.#count++
        await this.writeCountToFile()
        return this.#count
    }

    private async writeCountToFile() {
        await Bun.write(this.#file, this.#count.toString())
    }

}
