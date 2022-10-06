function classifier(input) {
  if (!Array.isArray(input)) {
    throw Error;
  }
  if (!input.length) {
    return { noOfGroups: 0 };
  }

  // spread/separate the input

  let splitInput = [...input];

  // create a function that calculates the age

  // insert the age in the input/ modify the input array

  let modifiedArray = splitInput.map((member) => ({
    name: member.name,
    age: calcAge(member.dob),
    regNo: member.regNo,
    dob: member.dob,
  }));

  // sort array by age
  const sortedArray = modifiedArray.sort((a, b) => {
    return a.age - b.age;
  });

  console.log(sortedArray);

  // initialize the first member of the array as the first group

  let group = [sortedArray[0]];
  let studentGroup = [];

  // sort group by age difference and group length
  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i].age - group[0].age <= 5 && group.length <= 2) {
      group.push(sortedArray[i]);
    } else {
      studentGroup.push(group);
      group = [];
      group.push(sortedArray[i]);
    }
  }

  // last group
  if (group.length !== 0) {
    studentGroup.push(group);
  }

  // set noOfGroups key as first property of the output
  let output = {};
  output.noOfGroups = studentGroup.length;

  // format groups based on output requirement
  const groupOutput = studentGroup.map((group) => {
    return {
      members: group.map((member) => ({
        name: member.name,
        age: member.age,
        dob: member.dob,
        regNo: member.regNo,
      })),
      oldest: group[group.length - 1].age,
      sum: group.reduce((acc, currentMember) => {
        return acc + currentMember.age;
      }, 0),
      regNos: group
        .map((member) => Number(member.regNo))
        .sort(function (a, b) {
          return a - b;
        }),
    };
  });

  // set output key for each group
  groupOutput.forEach((group, index) => {
    let currentGroup = `group${index + 1}`;

    // console.log(currentGroup);
    // we then have, noOfgroups, group(index + 1) and group details
    output = { ...output, [currentGroup]: group };
  });

  return output;
}

function calcAge(year) {
  const date = new Date(year);
  return new Date(2019, 0, 1).getFullYear() - date.getFullYear();
}

export default classifier;
