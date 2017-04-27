import React from 'react';

import AppLayout from 'terra-clinical-application/src/navigation/layouts/app-layout/AppLayout';
import ClinicalBase from 'terra-clinical-application/src/navigation/layouts/clinical-base/ClinicalBase';
import SlidePanelLayout from 'terra-clinical-application/src/navigation/layouts/slide-panel-layout/SlidePanelLayout';
// import BottomPanelLayout from 'terra-clinical-application/src/navigation/layouts/bottom-panel-layout/BottomPanelLayout';

import PatientListController from 'terra-clinical-application/src/patient-app/patient-list/PatientListController';

const PatientAppController = ({ physicianId }) => (
  <ClinicalBase style={{ height: '100%', width: '100%' }}>
    <AppLayout>
      <SlidePanelLayout>
        <PatientListController
          physicianId={physicianId}
          key={'PATIENT_LIST_APP'}
        />
      </SlidePanelLayout>
    </AppLayout>
  </ClinicalBase>
)

export default PatientAppController;

