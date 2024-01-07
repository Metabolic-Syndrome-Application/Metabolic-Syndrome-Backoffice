export const generateBirthYear = () => {
  const thaiBuddhistOffset = 543;
  const currentYear = new Date().getFullYear();
  const minAge = 16;
  const maxAge = 100;

  const birthYearOptions = [];

  for (let age = minAge; age <= maxAge; age++) {
    const birthYear = currentYear - age;
    const birthYearThaiBuddhist = birthYear + thaiBuddhistOffset;

    birthYearOptions.push({
      label: `${birthYearThaiBuddhist}`,
      value: `${birthYearThaiBuddhist}`,
    });
  }

  return birthYearOptions;
};
