# PagerDuty On-call Action

A GitHub Action to find the next person on call through PagerDuty.

## Usage

```yml
name: Find next person on call
on:
  schedule:
    - cron: 0 8 * * 1
jobs:
  run-action:
    runs-on: ubuntu-latest
    steps:
    - name: Ask PagerDuty
      id: pagerduty
      uses: mxie/pagerduty-oncall-action@main    # replace `main` with release tag
      with:
        token: ${{ secrets.PAGERDUTY_TOKEN }}
        schedule-id: ABCDEFG
    - run: echo ${{ steps.pagerduty.outputs.person }} is on call
```
