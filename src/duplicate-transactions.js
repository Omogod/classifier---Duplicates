function findDuplicateTransactions(transactions) {
  // Check transaction empty or not
  if (transactions === null || transactions === "") {
    throw new Error("Invalid transaction");
  }

  let transactionArray = [...transactions];

  // Check type of transaction
  if (typeof transactionArray !== "object") {
    throw new Error("Invalid Input");
  }

  // Check and compare time transaction was made
  let sortedTransArray = transactionArray.sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );
  let duplicates = [];
  let match = [];
  let firstIndex, nextIndex;

  while (sortedTransArray.length > 1) {
    firstIndex = 0;
    nextIndex = 1;
    match = [firstIndex];
    while (
      new Date(sortedTransArray[nextIndex].time) -
        new Date(sortedTransArray[firstIndex].time) <=
        60000 &&
      firstIndex < sortedTransArray.length - 1
    ) {
      if (
        compare_equal(sortedTransArray[firstIndex], sortedTransArray[nextIndex])
      ) {
        match.push(nextIndex);
        firstIndex = nextIndex;
      }
      nextIndex += 1;
      if (nextIndex === sortedTransArray.length) {
        break;
      }
    }

    if (match.length > 1) {
      let duplicateGroup = [];
      while (match.length) {
        let duplicateMember = sortedTransArray.splice(match.pop(), 1);
        duplicateGroup.unshift(duplicateMember[0]);
      }
      duplicates.push(duplicateGroup);
      match = [];
    } else {
      sortedTransArray.shift();
    }

    if (sortedTransArray.length == 1) {
      break;
    }
  }
  return duplicates;
}

//helper functionto check equality
function compare_equal(t1, t2) {
  if (
    t1.sourceAccount === t2.sourceAccount &&
    t1.targetAccount === t2.targetAccount &&
    t1.amount === t2.amount &&
    t1.category === t2.category
  ) {
    return true;
  } else {
    return false;
  }
}

export default findDuplicateTransactions;
