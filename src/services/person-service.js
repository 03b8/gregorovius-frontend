export const getPersonRoleTranslation = role => {
  switch (role) {
    case "mythological":
      return "Mythologische Figur";
    case "fictional":
      return "Fiktionale Person";
    default:
      return "Person";
  }
};

export const getPersonRoleClass = role => {
  switch (role) {
    case "mythological":
      return "purple-1";
    case "fictional":
      return "cyan-1";
    default:
      return "orange-1";
  }
};

export const getPersonTypeTranslation = personType => {
  switch (personType) {
    case "organisation":
      return "Organisation";
    case "person":
    default:
      return "Person";
  }
};

export const getPersonTypeClass = personType => {
  switch (personType) {
    case "organisation":
      return "blue-1";
    case "person":
    default:
      return "orange-1";
  }
};

export default {
  getPersonRoleTranslation,
  getPersonRoleClass,
  getPersonTypeTranslation,
  getPersonTypeClass
};
