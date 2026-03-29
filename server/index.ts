import {Counter} from "./scr/count.ts";
import {verifySignature} from "./scr/webhooks.ts";

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
        "/webhooks/deploy": {
            POST: async (req) => {
                console.log('AAAA', req)
                const body = await req.text()
                console.log('body', body,)
                console.log('signature', req.headers.get('X-Hub-Signature-256'))
                console.log('verify', verifySignature(process.env.GITHUB_WEBHOOK_SECRET!,req.headers.get('X-Hub-Signature-256')!, body ))
                console.log('secret', process.env.GITHUB_WEBHOOK_SECRET,)
                return new Response('ok')
            }
        }
    }
});

console.log(`Listening on ${server.url}`);
