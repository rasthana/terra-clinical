import React from 'react';

import PatientAppController from './PatientAppController';

const physicianId = 'physician1';

const PatientApp = () => (
  <PatientAppController physicianId={physicianId} />
);

export default PatientApp;
