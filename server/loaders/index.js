import expressLoader from './express';
import mongoLoader from './mongo';

export const init = async ({
  expressApp
}) => {
  await expressLoader({
    app: expressApp
  });
  await mongoLoader();
}

