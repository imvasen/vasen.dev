import {
  revalidateDirectusIndex,
  revalidateDirectusPosts,
} from '@web/app/actions';

export async function PATCH() {
  await revalidateDirectusIndex();
  await revalidateDirectusPosts();

  return Response.json({});
}
