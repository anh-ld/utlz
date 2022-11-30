import { Router } from 'worktop';
import * as Cache from 'worktop/cache';
import { uid as toUID } from 'worktop/utils';
import { read, write } from 'worktop/kv';
import type { KV } from 'worktop/kv';

declare var store: KV.Namespace;
declare var store_reverse: KV.Namespace;

interface U {
  url: string;
}

const API = new Router();

API.add('POST', '/u', async (req, res) => {
  const body = await req.body<U>();
  if (!body?.url) return res.send(400, 'Error');

  let hash = await read(store, body.url, 'text');

  if (!hash) {
    hash = toUID(3);
    await write(store, body.url, hash); // store {url: hash}
    await write(store_reverse, hash, body.url); // store {hash: url}
  }

  return res.send(200, hash);
});

API.add('GET', '/:id', async (req, res) => {
  const hash = req.params.id;

  let url = await read(store_reverse, hash, 'text');
  if (!url) return res.send(404);

  res.writeHead(302, { Location: url });
  return res.end(null);
});

API.add('GET', '/health', (_, res) => res.end('OK'));

Cache.listen(API.run);
