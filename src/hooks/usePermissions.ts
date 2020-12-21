import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';

// export const usePermissions = ({ requestFor, errorMessage }) => {
//   const [permission, setPermission] = useState<
//   Permissions.PermissionStatus
// >(undefined);

// const [permissionError, setPermissionError] = useState<
//   string
// >(undefined);

//   const requestRollCameraPermission = async () => {
//     const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

//     if (status !== 'granted') {
//       setPermissionError('Wymagane pozwolenie na dostęp do aparatu');
//     }

//     setPermission(status);
//   };

//   useEffect(() => {
//     requestRollCameraPermission();
//   }, []);

// status, isGranted,

//   return [permission, permissionError]
// }
