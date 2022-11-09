const initialData = {
  modelData: {
    users: [
      {
        id: 1,
        firstName: "Michael",
        lastName: "Fortune",
        emil: "Michael@gmail.com",
        phone: "09141840126",
      },
    ],
  },
  stateData: {
    editing: false,
    selectedId: -1,
    selectedUser: {},
    loading: true,
  },
};

export default function getInitialData() {
  return initialData;
}
