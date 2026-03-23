import {Counter} from "./scr/count.ts";

const yesCounter = new Counter('yes')

const server = Bun.serve({
    port: 61052,
    routes: {
        "/api/count": {
            GET: async()=>{
                const count = yesCounter.currentCount()
                return new Response(count.toString())
            },
            POST: async () => {
                await yesCounter.increment()
                const count = yesCounter.currentCount()
                return new Response(count.toString())
            }
        },
    }
});

console.log(`Listening on ${server.url}`);
