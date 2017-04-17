'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var patientListData = {
  physician1: [{
    id: '0',
    name: 'Tom',
    status: 'Admitted',
    comment: 'Cool'
  }, {
    id: '1',
    name: 'Mike',
    status: 'Discharged',
    comment: 'Not Cool'
  }, {
    id: '2',
    name: 'Harry',
    status: 'Discharged',
    comment: 'Not Cool'
  }, {
    id: '3',
    name: 'Sue',
    status: 'Discharged',
    comment: 'Cool'
  }]
};

var listeners = [];

var copy = function copy(object) {
  return JSON.parse(JSON.stringify(object));
};

var PatientStore = {
  getPatientList: function getPatientList(physicianId) {
    return copy(patientListData[physicianId]);
  },
  getPatient: function getPatient(physicianId, patientId) {
    return copy(patientListData[physicianId]).find(function (patient) {
      return patient.id === patientId;
    });
  },
  update: function update(physicianId, patientId, data) {
    var patientList = patientListData[physicianId];
    var patientToUpdate = patientList.find(function (patient) {
      return patient.id === patientId;
    });

    if (data.name) {
      patientToUpdate.name = data.name;
    }

    if (data.status) {
      patientToUpdate.status = data.status;
    }

    if (data.comment) {
      patientToUpdate.comment = data.comment;
    }

    listeners.map(function (listener) {
      return listener();
    });
  },
  subscribe: function subscribe(listener) {
    listeners.push(listener);
    return function () {
      listeners = listeners.filter(function (l) {
        return l !== listener;
      });
    };
  }
};

exports.default = PatientStore;