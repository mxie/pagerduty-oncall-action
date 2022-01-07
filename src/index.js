const pd = require("@pagerduty/pdjs");
const core = require("@actions/core");

async function run() {
  const pdToken = core.getInput("token");
  const scheduleId = core.getInput("schedule-id");
  const pdClient = pd.api({ token: pdToken });
  const params = `schedule_ids[]=${scheduleId}&earliest=true&limit=1`;

  pdClient
    .get(`/oncalls?${params}`)
    .then(({ resource }) => {
      // `resource` should be a list of oncall entries
      if (resource.length > 0) {
        core.debug(`Oncalls found: ${resource}`);

        const person = resource[0]["user"]["summary"];

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
