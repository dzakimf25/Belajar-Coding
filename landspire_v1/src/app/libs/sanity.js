import {
    createClient
} from "@sanity/client"

export const client = createClient({
    name: 'default',
    title: 'Landspire',
    projectId: 'uqsv68h3',
    dataset: 'certificate',
    useCdn: true,
    apiVersion: '2024-07-11',
    token: "skhnFrx0Ws2cvd83sASyMPxPDMiUghOPS42sfycK2OUwd2lzsmVOBidxy7Y6wp7ymmh3ezZgIK6MfkMIjkSaPiHLbb16hTjILt235a5v3qUW5nCFy4sL11libhlRHG3Qq4zI0RDoRfgDjrPDqhdWphV6DqIyrr3OdkAiY0HWW8Lk9rLQSk16"
});

export async function testSanity() {
    const data = await client.fetch(`count(*)`);
    console.log(`Number of data ${data}`); // set to `false` to by
    
}