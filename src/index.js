const pd = require("@pagerduty/pdjs");
const core = require("@actions/core");

async function run() {
  const pdToken = core.getInput("token");
  const scheduleId = core.getInput("schedule-id");
  const pdClient = pd.api({ token: pdToken });
  const today = new Date().toISOString().split("T")[0];
  const params = `schedule_ids[]=${scheduleId}&since=${today}`;

  pdClient
    .get(`/oncalls?${params}`)
    .then(({ resource }) => {
      if (resource.length > 0) {
        // `resource` should be a list of users
        const person = resource[0]["summary"];
        core.info(`🎉 On-call person found: ${person}`);
        core.setOutput("person", person);
      } else {
        core.setFailed("❓ No one is on the schedule");
      }
    })
    .catch((error) => {
      core.setFailed(`❌ Unable to fetch on-call data: ${error}`);
    });
}

run();
