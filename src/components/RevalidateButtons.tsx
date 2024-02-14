'use client';

import { revalidateDirectusIndex } from '@web/app/actions';

export default function RevalidateButtons() {
  return (
    <div>
      <button onClick={async () => await revalidateDirectusIndex()}>
        Revalidate Directus Index
      </button>
    </div>
  );
}
