import { track } from '@web/utils/track';

export const POST = async (req: Request) => {
  const { event, properties } = await req.json();

  await track(event, properties);

  return Response.json({});
};
