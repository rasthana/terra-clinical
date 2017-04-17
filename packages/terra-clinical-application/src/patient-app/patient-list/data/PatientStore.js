const patientListData = {
  physician1: [
    {
      id: '0',
      name: 'Tom',
      status: 'Admitted',
      comment: 'Cool',
    },
    {
      id: '1',
      name: 'Mike',
      status: 'Discharged',
      comment: 'Not Cool',
    },
    {
      id: '2',
      name: 'Harry',
      status: 'Discharged',
      comment: 'Not Cool',
    },
    {
      id: '3',
      name: 'Sue',
      status: 'Discharged',
      comment: 'Cool',
    },
  ],
};

let listeners = [];

const copy = object => JSON.parse(JSON.stringify(object));

const PatientStore = {
  getPatientList: physicianId => (copy(patientListData[physicianId])),
  getPatient: (physicianId, patientId) => (copy(patientListData[physicianId]).find(patient => (patient.id === patientId))),
  update: (physicianId, patientId, data) => {
    const patientList = patientListData[physicianId];
    const patientToUpdate = patientList.find(patient => (patient.id === patientId));

    if (data.name) {
      patientToUpdate.name = data.name;
    }

    if (data.status) {
      patientToUpdate.status = data.status;
    }

    if (data.comment) {
      patientToUpdate.comment = data.comment;
    }

    listeners.map(listener => listener());
  },
  subscribe: (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => (l !== listener));
    };
  },
};

export default PatientStore;
