import { api } from '@pagerduty/pdjs';
import * as core from "@actions/core";

async function run() {
  const pdToken = core.getInput("token");
  const pd = api({ token: pdToken });

  pd.get('/oncalls', { params: { "schedule_ids[]": "PNSZDLN", "limit": 1 } })
  .then({ data, resource, next } => {
    if (resource.length > 0) {
      person = resource[0]["user"]["summary"]
      core.info(`🎉 On-call person found: ${person}`);
      core.setOutput("person", person);
    } else {
      core.setFailed("❓ No one is on the schedule");
    }
  })
  .catch({
    core.setFailed("❌ Unable to fetch on-call data");
  });
}

run();
