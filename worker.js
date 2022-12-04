import { Hono } from 'hono';
import { cache } from 'hono/cache';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/serve-static.module';
import { prettyJSON } from 'hono/pretty-json';
import { nanoid } from 'nanoid';

const app = new Hono();

app.use('*', logger());
app.post('*', prettyJSON());

app.get('/', cache({ cacheName: 'cache', cacheControl: 'max-age=3600' }));
app.get('/', serveStatic({ path: './' }));
app.get('/i/:imageId', async c => {
  const { imageId } = c.req.param();
  let file = await c.env.IMAGE_BUCKET.get(imageId);

  if (!file) {
    c.status(404);
    return c.body('Not Found');
  }

  return c.body(file.body);
});
app.get('/u/:urlId', async c => {
  const { urlId } = c.req.param();
  let url = await c.env.HASH_URL.get(urlId);

  if (!url) {
    c.status(404);
    return c.body('Not Found');
  }

  return c.redirect(url);
});
app.post('/u', async c => {
  const { url } = await c.req.json();

  if (!url) {
    c.status(400);
    return c.body('Error');
  }

  let hash = await c.env.URL_HASH.get(url);

  if (!hash) {
    hash = nanoid(6);
    await c.env.URL_HASH.put(url, hash);
    await c.env.HASH_URL.put(hash, url);
  }

  return c.body(hash);
});
app.post('/i', async c => {
  const { file } = await c.req.parseBody();

  if (!file) {
    c.status(400);
    return c.body('Error');
  }

  let extension = file.name.substring(file.name.lastIndexOf('.'));
  let hash = nanoid(6);
  let name = hash + extension;

  await c.env.IMAGE_BUCKET.put(name, file.stream());
  return c.body(name);
});

export default {
  fetch(request, env, ctx) {
    return app.fetch(request, env, ctx)
  },
  async scheduled(controller, env, ctx) {
    const images = await env.IMAGE_BUCKET.list();
    const keys = images.objects.map(image => image.key);
    const promises = keys.map(async key => {
      await env.IMAGE_BUCKET.delete(key);
    })

    await Promise.all(promises);
    console.log('Cron processed');
	},
}
