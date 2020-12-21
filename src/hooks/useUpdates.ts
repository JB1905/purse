import { useEffect } from 'react';

import { otaUpdates } from '../config/otaUpdates';

export const useUpdates = () => {
  useEffect(() => {
    otaUpdates();
  }, []);
};
