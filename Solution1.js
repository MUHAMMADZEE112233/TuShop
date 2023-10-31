/**
 * Calculate the number of tasks and earnings available for others
 * once John picks jobs to maximize his earnings.
 * @param {Array} jobs - An array of jobs, each represented as [start_time, end_time, profit].
 * @returns {Array} An array with the number of tasks left for others and their total earnings.
 */
function maximizeEarnings(jobs) {
  jobs.sort((a, b) => a[1] - b[1]);

  const n = jobs.length;
  const maxEarningsAtJob = new Array(n).fill(0);

  maxEarningsAtJob[0] = jobs[0][2];

  for (let i = 1; i < n; i++) {
    let maxProfitAtJob = jobs[i][2];
    let leftIndex = 0;
    let rightIndex = i - 1;

    while (leftIndex <= rightIndex) {
      const mid = Math.floor((leftIndex + rightIndex) / 2);
      if (jobs[mid][1] <= jobs[i][0]) {
        leftIndex = mid + 1;
      } else {
        rightIndex = mid - 1;
      }
    }

    if (leftIndex > 0) {
      maxProfitAtJob += maxEarningsAtJob[leftIndex - 1];
    }

    maxEarningsAtJob[i] = Math.max(maxProfitAtJob, maxEarningsAtJob[i - 1]);
  }

  const totalMaxEarnings = maxEarningsAtJob[n - 1];

  let tasksLeftForOthers = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (maxEarningsAtJob[i] !== maxEarningsAtJob[i - 1]) {
      tasksLeftForOthers = n - i;
      break;
    }
  }

  const earningsLeftForOthers =
    jobs.reduce((totalEarnings, job) => totalEarnings + job[2], 0) -
    totalMaxEarnings;

  return [tasksLeftForOthers, earningsLeftForOthers];
}

const jobs1 = [
  [900, 1030, 100],
  [1000, 1200, 500],
  [1100, 1200, 300],
];

const jobs2 = [
  [900, 1000, 250],
  [945, 1200, 550],
  [1130, 1500, 150],
];

const jobs3 = [
  [900, 1030, 100],
  [1000, 1200, 100],
  [1100, 1200, 100],
];

const [jobsLeft, earningsLeft] = maximizeEarnings(jobs1);
console.log(
  `The number of tasks and earnings available for others\nTask: ${jobsLeft}\nEarnings: ${earningsLeft}`
);
