const patientListData = {
  physician1: [
    {
      id: '0',
      name: 'Tom',
      status: 'Admitted',
      comment: 'Cool',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Kurt_Russell_1974.JPG/220px-Kurt_Russell_1974.JPG',
    },
    {
      id: '1',
      name: 'Mike',
      status: 'Discharged',
      comment: 'Not Cool',
      photo: 'https://images-na.ssl-images-amazon.com/images/M/MV5BN2RmZThlN2ItNDczZC00MTI0LTlhZGItNjFiNmIzMTJiODM1XkEyXkFqcGdeQXVyMTE2NzA0Ng@@._V1_.jpg',
    },
    {
      id: '2',
      name: 'Harry',
      status: 'Discharged',
      comment: 'Not Cool',
      photo: 'https://s-media-cache-ak0.pinimg.com/236x/74/6e/9e/746e9ef43b23d9658f80c3b8c24862fb.jpg',
    },
    {
      id: '3',
      name: 'Sue',
      status: 'Discharged',
      comment: 'Cool',
      photo: 'http://2.bp.blogspot.com/-Mz5oF3dgHyU/TrXJCDSO30I/AAAAAAAAJ1s/9hICRzC8cF8/s400/ishot-141.jpg',
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
