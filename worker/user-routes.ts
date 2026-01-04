import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, InquiryEntity, ContactMessageEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { InquiryStatus } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // INQUIRIES
  app.get('/api/inquiries', async (c) => {
    const page = await InquiryEntity.list(c.env);
    return ok(c, page);
  });
  app.post('/api/inquiries', async (c) => {
    const body = await c.req.json();
    const inquiry = await InquiryEntity.create(c.env, {
      ...body,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      status: 'pending'
    });
    return ok(c, inquiry);
  });
  app.patch('/api/inquiries/:id', async (c) => {
    const id = c.req.param('id');
    const { status } = await c.req.json() as { status: InquiryStatus };
    const entity = new InquiryEntity(c.env, id);
    if (!await entity.exists()) return notFound(c);
    const updated = await entity.mutate(s => ({ ...s, status }));
    return ok(c, updated);
  });
  // CONTACT MESSAGES
  app.get('/api/contact-messages', async (c) => {
    const page = await ContactMessageEntity.list(c.env);
    return ok(c, page);
  });
  app.post('/api/contact-messages', async (c) => {
    const body = await c.req.json();
    const msg = await ContactMessageEntity.create(c.env, {
      ...body,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      status: 'unread'
    });
    return ok(c, msg);
  });
  app.patch('/api/contact-messages/:id', async (c) => {
    const id = c.req.param('id');
    const { status } = await c.req.json() as { status: 'read' | 'archived' };
    const entity = new ContactMessageEntity(c.env, id);
    if (!await entity.exists()) return notFound(c);
    const updated = await entity.mutate(s => ({ ...s, status }));
    return ok(c, updated);
  });
  // LEGACY ROUTES
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const page = await UserEntity.list(c.env);
    return ok(c, page);
  });
}