import {Counter} from "./scr/count.ts";
import {verifySignature} from "./scr/webhooks.ts";
import {$} from 'bun'

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
                const secret = process.env.GITHUB_WEBHOOK_SECRET
                const signature = req.headers.get('X-Hub-Signature-256')
                const body = await req.text()
                if (!secret || !signature || !body) {
                    return new Response('Bad Request', { status: 400 })
                }

                const verified = await verifySignature(secret,signature, body )
                if (!verified) {
                    return new Response('Unauthorized', { status: 401 })
                }

                const json = JSON.parse(body)
                const branch = json.ref.split('/').pop()
                if (branch !== 'server') return new Response('ok')

                // Build astro and restart server
                console.log("Deploying to server")
                $`cd /var/www/abertssquirrel.com && npm run build && pm2 restart abertssquirrel.com`

                return new Response('ok')
            }
        }
    }
});

console.log(`Listening on ${server.url}`);
